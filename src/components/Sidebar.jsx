import { NavLink } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const links = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/stok', label: 'Rekap Stok', icon: '📦' },
  { to: '/absensi', label: 'Absensi', icon: '📋' },
  { to: '/pelanggan', label: 'Data Pelanggan', icon: '👥' },
]

export default function Sidebar() {
  const { user, signOut } = useAuth()
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 p-4 overflow-y-auto flex flex-col">
      <h1 className="text-xl font-bold mb-6 text-primary">1gate</h1>
      <p className="text-xs text-gray-400 mb-4 truncate">{user?.email}</p>
      <nav className="space-y-2">
        {links.map(l => (
          <NavLink key={l.to} to={l.to}
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 transition">
            <span>{l.icon}</span><span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
      <button onClick={signOut}
        className="mt-auto mb-4 text-left flex items-center gap-3 p-2 rounded text-red-300 hover:bg-slate-800 transition">
        <span>🚪</span><span>Logout</span>
      </button>
    </aside>
  )
}
