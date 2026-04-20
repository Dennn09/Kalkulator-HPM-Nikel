import React from 'react';

const DEFAULT_CF = { ni: 27, fe: 30, co: 30, cr: 10 };

export default function TabHMA({ hma, setHMA, cf, setCF, showToast }) {
  const handleHMAChange = (key, val) => setHMA(prev => ({ ...prev, [key]: val }));
  const handleCFChange  = (key, val) => setCF(prev => ({ ...prev, [key]: val }));

  const resetCF = () => {
    setCF(DEFAULT_CF);
    showToast('CF direset ke default ✓');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* HMA */}
      <div>
        <div className="card">
          <div className="card-title">Nilai HMA (Harga Mineral Acuan)</div>
          <p className="font-mono text-[11px] text-muted mb-4 leading-relaxed">
            HMA ditetapkan Kementerian ESDM dua kali per bulan:&nbsp;
            <span className="text-white font-semibold">P1</span> = 1–15&nbsp;|&nbsp;
            <span className="text-white font-semibold">P2</span> = 16–akhir bulan
          </p>

          {/* Periode */}
          <div className="mb-4">
            <label className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-2">
              Periode
            </label>
            <input
              type="text"
              className="w-full bg-surface2 border border-border rounded-xl px-3 py-2.5 font-mono text-sm text-white outline-none focus:border-ni transition-colors"
              value={hma.period}
              placeholder="Contoh: April 2026 P2"
              onChange={e => handleHMAChange('period', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'ni', label: 'Nikel (USD/dmt)',      color: 'focus:border-ni' },
              { key: 'fe', label: 'Bijah Besi (USD/dmt)', color: 'focus:border-fe' },
              { key: 'co', label: 'Kobalt (USD/dmt)',     color: 'focus:border-co' },
              { key: 'cr', label: 'Krom (USD/dmt)',       color: 'focus:border-cr' },
            ].map(({ key, label, color }) => (
              <div key={key}>
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-2">
                  {label}
                </label>
                <input
                  type="number"
                  className={`w-full bg-surface2 border border-border rounded-xl px-3 py-2 font-mono text-base font-semibold text-white outline-none ${color} transition-colors`}
                  value={hma[key]}
                  step="0.01"
                  onChange={e => handleHMAChange(key, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 bg-danger/8 border border-danger/25 rounded-xl p-3 font-mono text-[11px] text-red-400 leading-relaxed">
            ⚠ Nilai HMA belum tentu berlaku untuk periode berikutnya. Selalu perbarui sesuai Kepmen terbaru.
          </div>

          <button
            className="btn btn-primary w-full mt-4 py-2.5"
            onClick={() => showToast('HMA berhasil disimpan ✓')}
          >
            Simpan HMA
          </button>
        </div>
      </div>

      {/* CF */}
      <div>
        <div className="card">
          <div className="card-title">Conversion Factor (CF)</div>
          <p className="font-mono text-[11px] text-muted mb-4 leading-relaxed">
            CF adalah persentase yang digunakan dalam perhitungan HPM.
            Nilai default sesuai Kepmen 144.K/2026.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'ni', label: 'CF Nikel (%)',         def: 27 },
              { key: 'fe', label: 'CF Besi Ikutan (%)',   def: 30 },
              { key: 'co', label: 'CF Kobalt Ikutan (%)', def: 30 },
              { key: 'cr', label: 'CF Krom Ikutan (%)',   def: 10 },
            ].map(({ key, label, def }) => (
              <div key={key} className="bg-surface2 rounded-xl p-4 border border-border">
                <label className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-2">
                  {label}
                </label>
                <input
                  type="number"
                  className="w-full bg-bg border border-border rounded-lg px-3 py-2 font-mono text-lg font-semibold text-white outline-none focus:border-ni transition-colors"
                  value={cf[key]}
                  step="0.1" min="0" max="100"
                  onChange={e => handleCFChange(key, e.target.value)}
                />
                <p className="font-mono text-[10px] text-muted mt-1">Default: {def}%</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-border my-4" />
          <div className="flex gap-3">
            <button className="btn btn-outline" onClick={resetCF}>↺ Reset ke Default</button>
            <button className="btn btn-primary" onClick={() => showToast('CF berhasil disimpan ✓')}>Simpan CF</button>
          </div>
        </div>
      </div>
    </div>
  );
}
