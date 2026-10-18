import { useState } from 'react'
function PelangganModule() {
  const [data, setData] = useState([
    { id: 1, nama: 'Toko Bunga', telpon: '0812xxxx', tagihan: 120000, status: 'Lunas' },
  ])
  const [form, setForm] = useState({ nama: '', telpon: '', tagihan: '' })
  const simpan = (e) => {
    e.preventDefault()
    setData([...data, { id: Date.now(), ...form, tagihan: +form.tagihan, status: 'Pending' }])
    setForm({ nama: '', telpon: '', tagihan: '' })
  }
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">👥 Data Pelanggan</h1>
      <form onSubmit={simpan} className="grid grid-cols-4 gap-3 mb-6">
        <input className="border p-2 rounded" placeholder="Nama" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Telpon" value={form.telpon} onChange={e => setForm({...form, telpon: e.target.value})} required />
        <input type="number" className="border p-2 rounded" placeholder="Nominal tagihan" value={form.tagihan} onChange={e => setForm({...form, tagihan: e.target.value})} required />
        <button className="bg-primary text-white rounded hover:bg-cyan-600">Tambah</button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead><tr className="bg-slate-100">
          <th className="p-3 text-left">Nama</th><th>Telpon</th><th>Tagihan</th><th>Status</th></tr>
        </thead>
        <tbody>
          {data.map(r => (<tr key={r.id} className="border-b">
            <td className="p-3">{r.nama}</td><td>{r.telpon}</td>
            <td>Rp {r.tagihan.toLocaleString()}</td>
            <td className={r.status==='Lunas'?'text-green-600':'text-orange-500'}>{r.status}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  )
}
export default PelangganModule
