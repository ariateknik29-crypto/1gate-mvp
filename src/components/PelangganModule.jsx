import { useState, useEffect } from 'react'
import { supabase } from '@/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export default function PelangganModule() {
  const { user } = useAuth()
  const [data, setData]     = useState([])
  const [form, setForm]     = useState({ nama: '', telpon: '', tagihan: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch = async () => {
    const { data, error } = await supabase.from('pelanggan').select('*').order('id', { ascending: false })
    if (error) setError(error.message); else setData(data || [])
  }
  useEffect(() => { if (user) fetch() }, [user])

  const simpan = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    const { error } = await supabase.from('pelanggan').insert([{
      user_id: user.id, nama: form.nama, telpon: form.telpon, tagihan: +form.tagihan, status: 'Pending'
    }])
    if (error) setError(error.message); else { setForm({ nama:'', telpon:'', tagihan:'' }); fetch() }
    setLoading(false)
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">👥 Data Pelanggan</h1>
      <form onSubmit={simpan} className="grid grid-cols-4 gap-3 mb-6">
        <input className="border p-2 rounded" placeholder="Nama" value={form.nama}
          onChange={e => setForm({...form, nama: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Telpon" value={form.telpon}
          onChange={e => setForm({...form, telpon: e.target.value})} required />
        <input type="number" className="border p-2 rounded" placeholder="Nominal tagihan"
          value={form.tagihan} onChange={e => setForm({...form, tagihan: e.target.value})} required />
        <button disabled={loading} className="bg-primary text-white rounded hover:bg-cyan-600">
          {loading ? '…' : 'Tambah'}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <table className="w-full bg-white rounded shadow">
        <thead><tr className="bg-slate-100">
          <th className="p-3 text-left">Nama</th><th>Telpon</th><th>Tagihan</th><th>Status</th></tr>
        </thead>
        <tbody>
          {data.map(r => (<tr key={r.id} className="border-b">
            <td className="p-3">{r.nama}</td><td>{r.telpon}</td>
            <td>Rp {Number(r.tagihan).toLocaleString()}</td>
            <td className={r.status==='Lunas'?'text-green-600':'text-orange-500'}>{r.status}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  )
}
