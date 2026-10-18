import { useState, useEffect } from 'react'
import { supabase } from '@/supabase/client'
import { useAuth } from '@/contexts/AuthContext'

export default function StokModule() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm]   = useState({ nama: '', qty: '', lokasi: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch = async () => {
    const { data, error } = await supabase.from('stok').select('*').order('id', { ascending: false })
    if (error) setError(error.message); else setItems(data || [])
  }
  useEffect(() => { if (user) fetch() }, [user])

  const tambah = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    const { error } = await supabase.from('stok').insert([{
      user_id: user.id, nama: form.nama, qty: +form.qty, lokasi: form.lokasi
    }])
    if (error) setError(error.message); else { setForm({ nama:'', qty:'', lokasi:'' }); fetch() }
    setLoading(false)
  }
  const kurang = async (id) => {
    const i = items.find(x => x.id === id)
    await supabase.from('stok').update({ qty: Math.max(0, i.qty - 1) }).eq('id', id)
    fetch()
  }
  const lowStock = items.filter(i => i.qty <= 5)

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">📦 Rekap Stok Barang</h1>
      <form onSubmit={tambah} className="grid grid-cols-4 gap-3 mb-6">
        <input className="border p-2 rounded" placeholder="Nama barang"
          value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
        <input type="number" className="border p-2 rounded" placeholder="Qty"
          value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Lokasi"
          value={form.lokasi} onChange={e => setForm({...form, lokasi: e.target.value})} required />
        <button disabled={loading} className="bg-primary text-white rounded hover:bg-cyan-600">
          {loading ? '…' : 'Tambah'}
        </button>
      </form>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      {lowStock.length > 0 && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded mb-4">
          ⚠️ Stok rendah: {lowStock.map(i => i.nama).join(', ')}
        </div>
      )}
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-slate-100">
          <tr><th className="p-3 text-left">Nama</th><th>Qty</th><th>Lokasi</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id} className="border-b">
              <td className="p-3">{i.nama}</td>
              <td className={i.qty <= 5 ? 'text-red-600 font-bold' : ''}>{i.qty}</td>
              <td>{i.lokasi}</td>
              <td><button onClick={() => kurang(i.id)} className="text-blue-600">−</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
