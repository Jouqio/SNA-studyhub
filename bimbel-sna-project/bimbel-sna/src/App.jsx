import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useStore } from './context/store'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import JadwalPage from './pages/JadwalPage'
import PembayaranPage from './pages/PembayaranPage'
import TodoPage from './pages/TodoPage'
import StatistikPage from './pages/StatistikPage'
import PengaturanPage from './pages/PengaturanPage'

function ProtectedRoute({ children }) {
  const isLoggedIn = useStore(s => s.isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default function App() {
  const { darkMode, isLoggedIn } = useStore()

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Poppins, sans-serif', fontSize: '13px', borderRadius: '12px' },
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="jadwal" element={<JadwalPage />} />
          <Route path="pembayaran" element={<PembayaranPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="statistik" element={<StatistikPage />} />
          <Route path="pengaturan" element={<PengaturanPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
