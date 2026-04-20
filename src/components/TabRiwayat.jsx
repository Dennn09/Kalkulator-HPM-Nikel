import React from 'react'

export default function TabRiwayat({ history, onDelete, onClear, showToast }) {
  const exportCSV = () => {
    if (!history.length) { showToast('Tidak ada data untuk diekspor'); return }
    let csv = 'No,Tanggal,Periode,User,Ni (%),Fe (%),Co (%),Cr (%),MC (%),HPM (USD/WMT)\n'
    history.forEach((e, i) => {
      const tgl = e.catatan || (e.created_at ? new Date(e.created_at).toLocaleString('id-ID') : '—')
      csv += `${i+1},"${tgl}","${e.periode||''}","${e.user_name||''}",${e.ni},${e.fe},${e.co},${e.cr},${e.mc},${parseFloat(e.hpm).toFixed(2)}\n`
    })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `HPM_Nikel_${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    showToast('CSV berhasil diunduh ✓')
  }

  const handleClear = () => {
    if (window.confirm('Hapus semua riwayat? Tidak dapat dibatalkan.')) {
      onClear()
      showToast('Riwayat dihapus ✓')
    }
  }

  // Format HPM: 49.12 (2 desimal, tanpa separator ribuan)
  const fmtHPM = (val) => {
    const n = parseFloat(val) || 0
    return n.toFixed(2)
  }

  // Ambil tanggal dari kolom catatan atau created_at
  const getTanggal = (e) => {
    if (e.catatan) return e.catatan
    if (e.created_at) {
      return new Date(e.created_at).toLocaleString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: false,
      })
    }
    return '—'
  }

  return (
    <div className="card">
      <div className="card-title">Riwayat Perhitungan</div>

      <div className="flex gap-3 mb-5 flex-wrap">
        <button className="btn btn-primary" onClick={exportCSV}>⬇ Export CSV</button>
        <button className="btn btn-outline" onClick={() => window.print()}>🖨 Cetak</button>
        <button className="btn btn-danger" onClick={handleClear}>🗑 Hapus Semua</button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 text-muted font-mono text-sm">
          <p>Belum ada riwayat perhitungan.</p>
          <p className="mt-1 text-xs">Lakukan perhitungan lalu klik "Simpan ke Riwayat".</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-surface2 border-b border-border">
                {['No','Tanggal','Periode','User','Ni (%)','Fe (%)','Co (%)','Cr (%)','MC (%)','HPM (USD/WMT)',''].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-muted tracking-wider uppercase text-[10px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((e, i) => (
                <tr key={e.id} className="border-b border-border hover:bg-surface2 transition-colors">
                  <td className="px-3 py-2.5 text-muted">{i + 1}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">{getTanggal(e)}</td>
                  <td className="px-3 py-2.5 text-ni whitespace-nowrap">{e.periode || '—'}</td>
                  <td className="px-3 py-2.5 text-muted">{e.user_name || '—'}</td>
                  <td className="px-3 py-2.5">{e.ni}</td>
                  <td className="px-3 py-2.5">{e.fe}</td>
                  <td className="px-3 py-2.5">{e.co}</td>
                  <td className="px-3 py-2.5">{e.cr}</td>
                  <td className="px-3 py-2.5">{e.mc}</td>
                  <td className="px-3 py-2.5 font-bold text-sm" style={{color:'#c8a84b'}}>{fmtHPM(e.hpm)}</td>
                  <td className="px-3 py-2.5">
                    <button
                      onClick={() => onDelete(e.id)}
                      className="bg-transparent border border-danger/30 text-danger rounded px-2 py-0.5 text-[11px] cursor-pointer hover:bg-danger/15 transition-colors"
                    >✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
