import { useState } from 'react'
function StokModule() {
  const [items, setItems] = useState([
    { id: 1, nama: 'Beras 5kg', qty: 12, lokasi: 'Gudang A' },
    { id: 2, nama: 'Gula pasir', qty: 5, lokasi: 'Gudang B' },
  ])
  const [form, setForm] = useState({ nama: '', qty: '', lokasi: '' })
  const tambah = (e) => {
    e.preventDefault()
    setItems([...items, { id: Date.now(), ...form, qty: +form.qty }])
    setForm({ nama: '', qty: '', lokasi: '' })
  }
  const kurang = (id) => setItems(items.map(x => x.id === id ? { ...x, qty: Math.max(0, x.qty - 1) } : x))
  const lowStock = items.filter(i => i.qty <= 5)
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">📦 Rekap Stok Barang</h1>
      <form onSubmit={tambah} className="grid grid-cols-4 gap-3 mb-6">
        <input className="border p-2 rounded" placeholder="Nama barang" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
        <input type="number" className="border p-2 rounded" placeholder="Qty" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Lokasi" value={form.lokasi} onChange={e => setForm({...form, lokasi: e.target.value})} required />
        <button className="bg-primary text-white rounded hover:bg-cyan-600">Tambah</button>
      </form>
      {lowStock.length > 0 && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded mb-4">
          Stok rendah: {lowStock.map(i => i.nama).join(', ')}
        </div>
      )}
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-slate-100"><tr><th className="p-3 text-left">Nama</th><th>Qty</th><th>Lokasi</th><th>Aksi</th></tr></thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id} className="border-b">
              <td className="p-3">{i.nama}</td>
              <td className={i.qty <= 5 ? 'text-red-600 font-bold' : ''}>{i.qty}</td>
              <td>{i.lokasi}</td>
              <td><button onClick={() => kurang(i.id)} className="text-blue-600">-</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default StokModule
