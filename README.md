<div align="center">

#  Bimbel SNA Dashboard

### Modern Tutoring Management Platform

Manage schedules, payments, daily tasks, and business analytics in one beautiful dashboard.

<p align="center">
  <img src="./docs/dashboard-preview.png" alt="Dashboard Preview" width="100%">
</p>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-orange?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)

###  Live Demo

https://your-demo-link.vercel.app

</div>

---

#  Overview

**Bimbel SNA Dashboard** adalah aplikasi manajemen operasional bimbingan belajar yang dirancang untuk membantu tutor dan pemilik bimbel mengelola seluruh aktivitas harian dalam satu sistem terintegrasi.

Mulai dari:

-  Pengelolaan jadwal les
-  Monitoring pembayaran siswa
-  To-Do List operasional
-  Statistik bisnis
-  Reminder & notifikasi
-  Export laporan PDF

Semua data tersimpan secara lokal menggunakan browser storage sehingga aplikasi dapat digunakan tanpa backend tambahan.

---

#  Project Goals

Banyak tutor masih mengelola:

- Jadwal di WhatsApp
- Pembayaran di Excel
- Catatan tugas di kertas
- Statistik secara manual

Proyek ini dibuat untuk menyatukan seluruh kebutuhan tersebut dalam satu dashboard modern yang cepat, sederhana, dan mudah digunakan.

---

#  Screenshots

## Dashboard

![Dashboard](./docs/dashboard-preview.png)

---

## Schedule Management

![Schedule](./docs/schedule-preview.png)

---

## Payment Tracking

![Payment](./docs/payment-preview.png)

---

## Analytics

![Analytics](./docs/statistics-preview.png)

---

#  Key Features

##  Smart Dashboard

Pusat informasi operasional harian.

### Menampilkan

- Total siswa aktif
- Total sesi les mingguan
- Total pemasukan
- Progress tugas
- Jadwal hari ini
- Aktivitas terbaru
- Grafik pemasukan

---

## 📅 Schedule Management

Kelola seluruh jadwal les dengan mudah.

### Fitur

- Tambah jadwal
- Edit jadwal
- Hapus jadwal
- Kalender interaktif
- Tampilan per hari
- Kategori jadwal
- Rekap jadwal mingguan
- Export PDF

---

##  Payment Tracking

Monitoring pembayaran siswa secara real-time.

### Fitur

- Status pembayaran
- Lunas / Belum lunas
- Filter siswa
- Search siswa
- Progress pembayaran
- Export PDF
- Reset pembayaran bulanan

---

## ✅ To-Do Management

Produktivitas harian dalam satu tempat.

### Fitur

- CRUD tugas
- Prioritas tugas
- Deadline
- Deteksi keterlambatan
- Progress keseluruhan
- Sorting otomatis
- Filter status

---

##  Business Analytics

Visualisasi performa operasional.

### Charts

- Revenue Trend
- Schedule Distribution
- Payment Completion
- Student Summary

---

##  Modern User Experience

### UI Features

- Dark Mode
- Responsive Layout
- Toast Notification
- Smooth Animation
- Interactive Charts
- Sidebar Navigation
- Notification Center

---

#  Architecture

```text
src
│
├── components
│   └── Shared UI Components
│
├── pages
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── JadwalPage.jsx
│   ├── PembayaranPage.jsx
│   ├── TodoPage.jsx
│   ├── StatistikPage.jsx
│   └── PengaturanPage.jsx
│
├── layouts
│   └── MainLayout.jsx
│
├── context
│   └── store.js
│
├── data
│   └── initialData.js
│
├── utils
│   └── helpers.js
│
├── styles
│   └── index.css
│
├── App.jsx
└── main.jsx
```

---

#  Technology Stack

| Layer | Technology |
|---------|---------|
| Frontend | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| State Management | Zustand |
| Routing | React Router v6 |
| Animations | Framer Motion |
| Calendar | FullCalendar |
| Charts | Recharts |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| PDF Export | jsPDF + AutoTable |
| Deployment | Vercel |

---

#  Engineering Decisions

## Why React?

- Component-based architecture
- Reusable UI
- Excellent ecosystem
- Easy scalability

---

## Why Zustand?

Dipilih dibanding Redux karena:

- Minimal boilerplate
- Simpler API
- Better developer experience
- Cocok untuk dashboard skala kecil-menengah

---

## Why Tailwind CSS?

- Utility-first workflow
- Konsistensi desain
- Cepat dikembangkan
- Mudah maintenance

---

## Why LocalStorage?

Untuk versi awal aplikasi:

- Tidak memerlukan backend
- Setup sangat cepat
- Cocok untuk penggunaan personal
- Deployment sederhana

---

#  Folder Structure

```text
bimbel-sna-dashboard
│
├── public
│
├── src
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── context
│   ├── data
│   ├── utils
│   ├── styles
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

---

#  Getting Started

## Clone Repository

```bash
git clone https://github.com/USERNAME/bimbel-sna-dashboard.git
```

Masuk ke folder:

```bash
cd bimbel-sna-dashboard
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Akses aplikasi:

```text
http://localhost:5173
```

---

#  Production Build

Build aplikasi:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

#  Authentication

Versi saat ini menggunakan:

```text
Single Admin Authentication
```

Protected Routes:

- Dashboard
- Jadwal
- Pembayaran
- Statistik
- Pengaturan

---

#  Data Persistence

Menggunakan:

```text
Browser LocalStorage
```

Keuntungan:

✅ Offline-friendly

✅ Cepat

✅ Tidak membutuhkan database

✅ Deployment sederhana

---

#  PDF Reporting

Laporan yang dapat diexport:

### Jadwal

```text
Schedule Report PDF
```

### Pembayaran

```text
Payment Report PDF
```

Menggunakan:

```text
jsPDF + AutoTable
```

---

#  Responsive Design

Mendukung:

- Desktop
- Laptop
- Tablet
- Smartphone

---

#  Future Roadmap

## Version 2.0

### Student Management

- [ ] Attendance Tracking
- [ ] Student Notes
- [ ] Student Progress Report

### Communication

- [ ] WhatsApp Reminder
- [ ] Broadcast Message
- [ ] Parent Notification

### Cloud Features

- [ ] Firebase Integration
- [ ] Supabase Integration
- [ ] Cloud Backup
- [ ] Real-time Sync

### Business Features

- [ ] Financial Reports
- [ ] Revenue Forecast
- [ ] Multi Tutor Management
- [ ] Parent Portal

---

#  Current Status

| Module | Status |
|---------|---------|
| Dashboard | ✅ Complete |
| Schedule | ✅ Complete |
| Payment | ✅ Complete |
| To-Do | ✅ Complete |
| Statistics | ✅ Complete |
| Settings | ✅ Complete |
| Responsive UI | ✅ Complete |
| PDF Export | ✅ Complete |
| Cloud Sync | 🚧 Planned |
| Multi User | 🚧 Planned |

---

#  Contributing

Contributions are welcome.

1. Fork repository
2. Create feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push changes

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

#  License

Distributed under the MIT License.

See `LICENSE` for more information.

---

#  Author

### Bimbel SNA

Private Tutoring Management Dashboard

Built using modern frontend technologies and best practices.

---
