import { Link } from 'react-router-dom'
const modul = [
  { to: '/stok', label: 'Rekap Stok', desc: 'Kelola stok barang realtime', color: 'bg-blue-500' },
  { to: '/absensi', label: 'Absensi', desc: 'Rekap kehadiran tim', color: 'bg-green-500' },
  { to: '/pelanggan', label: 'Data Pelanggan', desc: 'Database pelanggan & follow-up', color: 'bg-purple-500' },
]
function Dashboard() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">👋 Selamat datang di 1gate</h1>
      <p className="text-gray-600 mb-8">Satu gerbang terpusat untuk semua kebutuhan operasional kamu.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {modul.map(m => (
          <Link key={m.to} to={m.to} className="block p-6 bg-white rounded-xl shadow hover:shadow-lg transition group">
            <div className={`w-12 h-12 rounded ${m.color} mb-4`} />
            <h3 className="text-xl font-semibold mb-1 group-hover:text-primary">{m.label}</h3>
            <p className="text-sm text-gray-500">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Dashboard
