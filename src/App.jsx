import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import StokModule from '@/components/StokModule'
import AbsensiModule from '@/components/AbsensiModule'
import PelangganModule from '@/components/PelangganModule'
import ProtectedRoute from '@/components/ProtectedRoute'
import AuthPage from '@/components/Auth'

function App() {
  const { user } = useAuth()
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {user && <Sidebar />}
      <main className={user ? "flex-1 overflow-y-auto p-6 ml-64" : "flex-1 overflow-y-auto p-6"}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/stok" element={<ProtectedRoute><StokModule /></ProtectedRoute>} />
          <Route path="/absensi" element={<ProtectedRoute><AbsensiModule /></ProtectedRoute>} />
          <Route path="/pelanggan" element={<ProtectedRoute><PelangganModule /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
export default App
