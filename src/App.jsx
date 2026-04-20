import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useAuth } from './context/AuthContext'
import { hitungHPM, fmt, getPeriodLabel } from './utils/calc'
import { getRiwayat, simpanRiwayat, hapusRiwayat, getHMAActive } from './utils/db'
import { useToast } from './hooks/useToast'

import Toast      from './components/Toast'
import LoginPage  from './components/LoginPage'
import InputKadar from './components/InputKadar'
import HMADisplay from './components/HMADisplay'
import HasilHPM   from './components/HasilHPM'
import TabHMA     from './components/TabHMA'
import TabRiwayat from './components/TabRiwayat'
import TabInfo    from './components/TabInfo'

const DEFAULT_HMA = { ni: '', fe: '', co: '', cr: '', period: '' }
const DEFAULT_CF  = { ni: 27, fe: 30, co: 30, cr: 10 }

const TABS = [
  { id: 'kalkulator', label: '🧮 Kalkulator' },
  { id: 'hma',        label: '📊 HMA & CF'   },
  { id: 'riwayat',    label: '📋 Riwayat'    },
  { id: 'info',       label: 'ℹ️ Info'        },
]

export default function App() {
  const { user, loading: authLoading, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('kalkulator')
  const [inputs,    setInputs]    = useState({ ni: '', fe: '', co: '', cr: '', mc: '' })
  const [hma,       setHMA]       = useState(DEFAULT_HMA)
  const [cf,        setCF]        = useState(DEFAULT_CF)
  const [history,   setHistory]   = useState([])
  const [dbLoading, setDbLoading] = useState(false)
  const { toast, showToast } = useToast()

  const loadHMA = useCallback(async () => {
    const data = await getHMAActive()
    if (data) {
      setHMA({ ni: data.hma_ni, fe: data.hma_fe, co: data.hma_co, cr: data.hma_cr, period: data.periode })
      setCF({ ni: data.cf_ni, fe: data.cf_fe, co: data.cf_co, cr: data.cf_cr })
    }
  }, [])

  const loadRiwayat = useCallback(async () => {
    try {
      setDbLoading(true)
      const data = await getRiwayat()
      setHistory(data || [])
    } catch { showToast('Gagal memuat riwayat') }
    finally { setDbLoading(false) }
  }, [showToast])

  useEffect(() => {
    if (user) { loadHMA(); loadRiwayat() }
  }, [user, loadHMA, loadRiwayat])

  const numInputs = useMemo(() => ({
    ni: parseFloat(inputs.ni) || 0, fe: parseFloat(inputs.fe) || 0,
    co: parseFloat(inputs.co) || 0, cr: parseFloat(inputs.cr) || 0,
    mc: parseFloat(inputs.mc) || 0,
  }), [inputs])

  const numHMA = useMemo(() => ({
    ni: parseFloat(hma.ni) || 0, fe: parseFloat(hma.fe) || 0,
    co: parseFloat(hma.co) || 0, cr: parseFloat(hma.cr) || 0,
  }), [hma])

  const numCF = useMemo(() => ({
    ni: parseFloat(cf.ni) || 0, fe: parseFloat(cf.fe) || 0,
    co: parseFloat(cf.co) || 0, cr: parseFloat(cf.cr) || 0,
  }), [cf])

  const result = useMemo(() => hitungHPM(numInputs, numHMA, numCF), [numInputs, numHMA, numCF])

  const handleInputChange = (key, val) => setInputs(prev => ({ ...prev, [key]: val }))

  const saveToHistory = async () => {
    try {
      await simpanRiwayat({
        periode: hma.period || '—',
        ni: parseFloat(inputs.ni) || 0, fe: parseFloat(inputs.fe) || 0,
        co: parseFloat(inputs.co) || 0, cr: parseFloat(inputs.cr) || 0,
        mc: parseFloat(inputs.mc) || 0, hpm: result.hpm,
      })
      await loadRiwayat()
      showToast('Tersimpan ke database ✓')
    } catch { showToast('Gagal menyimpan. Coba lagi.') }
  }

  const deleteEntry = async (id) => {
    try {
      await hapusRiwayat(id)
      setHistory(prev => prev.filter(e => e.id !== id))
      showToast('Data dihapus ✓')
    } catch { showToast('Gagal menghapus.') }
  }

  const copyResult = () => {
    const text = `HPM Bijah Nikel — ${hma.period||'—'}\nNi:${inputs.ni||0}% Fe:${inputs.fe||0}% Co:${inputs.co||0}% Cr:${inputs.cr||0}% MC:${inputs.mc||0}%\nHPM = ${fmt(result.hpm)} USD/WMT\n(Kepmen ESDM 144.K/2026)`
    navigator.clipboard.writeText(text).then(() => showToast('Hasil disalin ✓'))
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-muted text-sm animate-pulse">Memuat...</p>
      </div>
    )
  }

  if (!user) return <LoginPage />

  return (
    <div className="min-h-screen bg-bg text-white px-4 py-6 font-sans">
      <div className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,168,75,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-ni tracking-tight">⛏ HPM Bijah Nikel</h1>
            <p className="font-mono text-[11px] text-muted uppercase tracking-widest mt-0.5">
              Kalkulator · Kepmen ESDM 144.K/2026
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-ni/10 border border-ni/30 rounded-lg px-3 py-1.5 font-mono text-[11px] text-ni uppercase tracking-widest">
              {getPeriodLabel()}
            </div>
            <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-1.5">
              <span className="font-mono text-[11px] text-muted">👤 {user.email?.split('@')[0]}</span>
              <span className="text-border">|</span>
              <button onClick={signOut} className="font-mono text-[11px] text-danger hover:text-red-400 transition-colors">
                Keluar
              </button>
            </div>
          </div>
        </header>

        {/* TABS */}
        <div className="flex gap-1 mb-7 bg-surface border border-border rounded-xl p-1 w-fit overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'kalkulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 items-start animate-slide-up">
            <div>
              <InputKadar values={inputs} onChange={handleInputChange} />
              <HMADisplay hma={{ ...numHMA, period: hma.period }} />
            </div>
            <HasilHPM result={result} inputs={inputs} hma={numHMA} cf={numCF}
              onSave={saveToHistory} onCopy={copyResult} onCetak={() => window.print()} />
          </div>
        )}

        {activeTab === 'hma' && (
          <div className="animate-slide-up">
            <TabHMA hma={hma} setHMA={setHMA} cf={cf} setCF={setCF} showToast={showToast} />
          </div>
        )}

        {activeTab === 'riwayat' && (
          <div className="animate-slide-up">
            {dbLoading
              ? <div className="card text-center py-16 font-mono text-muted text-sm animate-pulse">Memuat riwayat...</div>
              : <TabRiwayat history={history} onDelete={deleteEntry} onClear={() => {}} showToast={showToast} />
            }
          </div>
        )}

        {activeTab === 'info' && <div className="animate-slide-up"><TabInfo /></div>}
      </div>

      <Toast visible={toast.visible} message={toast.message} />
    </div>
  )
}
