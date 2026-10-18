import { useState } from 'react'
function AbsensiModule() {
  const [catat, setCatat] = useState([
    { id: 1, nama: 'Andi', tgl: '2026-10-18', masuk: '08:05', pulang: '17:10', status: 'Hadir' },
  ])
  const [form, setForm] = useState({ nama: '', masuk: '', pulang: '' })
  const simpan = (e) => {
    e.preventDefault()
    const s = form.masuk && form.pulang ? 'Hadir' : 'Izin'
    setCatat([...catat, { id: Date.now(), tgl: new Date().toISOString().slice(0,10), ...form, status: s }])
    setForm({ nama: '', masuk: '', pulang: '' })
  }
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">📋 Rekap Absensi</h1>
      <form onSubmit={simpan} className="grid grid-cols-4 gap-3 mb-6">
        <input className="border p-2 rounded" placeholder="Nama" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required />
        <input type="time" className="border p-2 rounded" value={form.masuk} onChange={e => setForm({...form, masuk: e.target.value})} />
        <input type="time" className="border p-2 rounded" value={form.pulang} onChange={e => setForm({...form, pulang: e.target.value})} />
        <button className="bg-primary text-white rounded hover:bg-cyan-600">Simpan</button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead><tr className="bg-slate-100">
          <th className="p-3 text-left">Nama</th><th>Tgl</th><th>Masuk</th><th>Pulang</th><th>Status</th></tr>
        </thead>
        <tbody>
          {catat.map(r => (<tr key={r.id} className="border-b">
            <td className="p-3">{r.nama}</td><td>{r.tgl}</td><td>{r.masuk}</td>
            <td>{r.pulang || '-'}</td>
            <td className={r.status==='Hadir'?'text-green-600':'text-orange-500'}>{r.status}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  )
}
export default AbsensiModule
