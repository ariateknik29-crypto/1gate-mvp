import { useState, useEffect } from 'react'
import { supabase } from '@/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export default function AbsensiModule() {
  const { user } = useAuth()
  const [catat, setCatat]   = useState([])
  const [form, setForm]     = useState({ nama: '', masuk: '', pulang: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch = async () => {
    const { data, error } = await supabase.from('absensi').select('*').order('id', { ascending: false })
    if (error) setError(error.message); else setCatat(data || [])
  }
  useEffect(() => { if (user) fetch() }, [user])

  const simpan = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    const status = form.masuk && form.pulang ? 'Hadir' : 'Izin'
    const { error } = await supabase.from('absensi').insert([{
      user_id: user.id, nama: form.nama, masuk: form.masuk, pulang: form.pulang || null, status
    }])
    if (error) setError(error.message); else { setForm({ nama:'', masuk:'', pulang:'' }); fetch() }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">📋 Rekap Absensi</h1>
      <form onSubmit={simpan} className="grid grid-cols-4 gap-3 mb-6">
        <input className="border p-2 rounded" placeholder="Nama" value={form.nama}
          onChange={e => setForm({...form, nama: e.target.value})} required />
        <input type="time" className="border p-2 rounded" value={form.masuk}
          onChange={e => setForm({...form, masuk: e.target.value})} />
        <input type="time" className="border p-2 rounded" value={form.pulang}
          onChange={e => setForm({...form, pulang: e.target.value})} />
        <button disabled={loading} className="bg-primary text-white rounded hover:bg-cyan-600">
          {loading ? '…' : 'Simpan'}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <table className="w-full bg-white rounded shadow">
        <thead><tr className="bg-slate-100">
          <th className="p-3 text-left">Nama</th><th>Tgl</th><th>Masuk</th><th>Pulang</th><th>Status</th></tr>
        </thead>
        <tbody>
          {catat.map(r => (<tr key={r.id} className="border-b">
            <td className="p-3">{r.nama}</td><td>{r.tgl?.slice(0,10)}</td><td>{r.masuk}</td>
            <td>{r.pulang || '-'}</td>
            <td className={r.status==='Hadir'?'text-green-600':'text-orange-500'}>{r.status}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  )
}
