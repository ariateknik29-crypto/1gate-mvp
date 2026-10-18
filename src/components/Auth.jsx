import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import reactLogo from '../assets/react.svg'

export default function Auth() {
  const { signIn, signUp } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode]         = useState('login')     // login | register
  const [error, setError]       = useState('')
  const [info, setInfo]         = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setInfo('')
    const { error } = mode === 'login' ? await signIn(email, password) : await signUp(email, password)
    if (error) setError(error.message)
    else if (mode === 'register') setInfo('Cek email kamu untuk konfirmasi akun.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <img src={reactLogo} alt="logo" className="h-8" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          {mode === 'login' ? 'Login' : 'Daftar Akun 1gate'}
        </h1>
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        {info  && <p className="text-sm text-green-700 mb-3">{info}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border p-2 rounded" type="email"
            placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full border p-2 rounded" type="password"
            placeholder="Password (min 6 kar)" value={password}
            onChange={e => setPassword(e.target.value)} required minLength={6} />
          <button className="w-full bg-primary text-white py-2 rounded hover:bg-cyan-600">
            {mode === 'login' ? 'Login' : 'Daftar'}
          </button>
        </form>

        <p className="text-center text-sm mt-5">
          {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-primary font-medium">Klik di sini</button>
        </p>
      </div>
    </div>
  )
}
