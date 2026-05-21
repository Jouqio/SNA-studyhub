import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const formatRupiah = (n) =>
  'Rp' + Number(n).toLocaleString('id-ID')

export const formatDate = (iso) => {
  try { return format(parseISO(iso), 'dd MMM yyyy', { locale: id }) }
  catch { return iso || '—' }
}

export const timeAgo = (iso) => {
  try { return formatDistanceToNow(parseISO(iso), { addSuffix: true, locale: id }) }
  catch { return '' }
}

export const getDayOfWeek = () => {
  const map = { 0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu' }
  return map[new Date().getDay()]
}

export const getTodayFormatted = () =>
  format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })

export const schedulesToCalendarEvents = (schedules) => {
  const events = []
  const dayNumbers = { Senin: 1, Selasa: 2, Rabu: 3, Kamis: 4, Jumat: 5, Sabtu: 6, Minggu: 0 }

  Object.entries(schedules).forEach(([day, items]) => {
    items.forEach(item => {
      const dayNum = dayNumbers[day]
      const today = new Date()
      const diff = (dayNum - today.getDay() + 7) % 7
      const date = new Date(today)
      date.setDate(today.getDate() - today.getDay() + dayNum)

      // Create recurring events for 4 weeks
      for (let w = -1; w <= 4; w++) {
        const d = new Date(date)
        d.setDate(d.getDate() + w * 7)
        const ds = d.toISOString().split('T')[0]
        events.push({
          id: `${item.id}-${w}`,
          title: item.name,
          start: `${ds}T${item.start}:00`,
          end:   `${ds}T${item.end}:00`,
          backgroundColor: item.type === 'kuliah' ? '#7C3AED' : (item.color || '#2563EB'),
          borderColor: 'transparent',
          extendedProps: { ...item, day },
        })
      }
    })
  })
  return events
}

export const exportPaymentPDF = (payments) => {
  const doc = new jsPDF()
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Laporan Pembayaran - Bimbel SNA', 14, 20)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Dicetak: ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: id })}`, 14, 28)

  const rows = payments.map(p => [
    p.name,
    formatRupiah(p.fee),
    p.paid ? 'Lunas' : 'Belum Lunas',
    p.paidDate ? formatDate(p.paidDate) : '—',
  ])

  autoTable(doc, {
    head: [['Nama Siswa', 'Nominal', 'Status', 'Tanggal Bayar']],
    body: rows,
    startY: 35,
    styles: { font: 'helvetica', fontSize: 11 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    alternateRowStyles: { fillColor: [239, 246, 255] },
    columnStyles: { 2: { halign: 'center' } },
  })

  const total = payments.filter(p => p.paid).reduce((a, b) => a + b.fee, 0)
  const finalY = doc.lastAutoTable.finalY + 8
  doc.setFont('helvetica', 'bold')
  doc.text(`Total Terkumpul: ${formatRupiah(total)}`, 14, finalY)
  doc.save('pembayaran-bimbel-sna.pdf')
}

export const exportSchedulePDF = (schedules) => {
  const doc = new jsPDF()
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text('Jadwal Les Privat - Bimbel SNA', 14, 20)

  let y = 30
  Object.entries(schedules).forEach(([day, items]) => {
    if (items.length === 0) return
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(day, 14, y)
    y += 4
    autoTable(doc, {
      head: [['Nama / Kegiatan', 'Mulai', 'Selesai', 'Tipe']],
      body: items.map(i => [i.name, i.start, i.end, i.type === 'les' ? 'Les Privat' : 'Kuliah']),
      startY: y,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [37, 99, 235] },
      margin: { top: y },
    })
    y = doc.lastAutoTable.finalY + 8
  })
  doc.save('jadwal-bimbel-sna.pdf')
}

export const cls = (...args) => args.filter(Boolean).join(' ')
