import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const err = await signIn(email, password)
    if (err) setError('Email atau password salah. Coba lagi.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      {/* Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,168,75,0.07) 0%, transparent 70%)' }} />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-ni tracking-tight">⛏ HPM Nikel</h1>
          <p className="font-mono text-[11px] text-muted uppercase tracking-widest mt-1">
            Kepmen ESDM 144.K/2026
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-2xl p-7">
          <h2 className="text-lg font-bold mb-1">Masuk</h2>
          <p className="text-muted text-sm font-mono mb-6">Khusus karyawan perusahaan</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-surface2 border border-border rounded-xl px-3 py-2.5
                           font-mono text-sm text-white outline-none focus:border-ni transition-colors"
                placeholder="email@perusahaan.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-surface2 border border-border rounded-xl px-3 py-2.5
                           font-mono text-sm text-white outline-none focus:border-ni transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/30 rounded-lg px-3 py-2
                              font-mono text-xs text-danger">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ni text-bg font-bold rounded-xl text-sm
                         hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Masuk →'}
            </button>
          </form>
        </div>

        <p className="text-center text-muted font-mono text-[11px] mt-5">
          Belum punya akun? Hubungi Deni hehehe
        </p>
      </div>
    </div>
  )
}
