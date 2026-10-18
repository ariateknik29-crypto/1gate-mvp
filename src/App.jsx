import { Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import StokModule from '@/components/StokModule'
import AbsensiModule from '@/components/AbsensiModule'
import PelangganModule from '@/components/PelangganModule'

function App() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stok" element={<StokModule />} />
          <Route path="/absensi" element={<AbsensiModule />} />
          <Route path="/pelanggan" element={<PelangganModule />} />
        </Routes>
      </main>
    </div>
  )
}
export default App
