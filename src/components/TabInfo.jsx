import React from 'react';

export default function TabInfo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div>
        <div className="card">
          <div className="card-title">Tentang Kalkulator</div>
          <p className="font-mono text-[11px] text-muted leading-relaxed mb-4">
            Kalkulator ini menghitung{' '}
            <span className="text-white font-semibold">Harga Patokan Mineral (HPM) Bijah Nikel</span>{' '}
            berdasarkan:
          </p>
          <p className="font-mono text-[11px] text-ni font-semibold mb-4">
            📌 Kepmen ESDM No. 144.K/MB.01/MEM.B/2026
          </p>

          <div className="bg-surface2 rounded-xl p-4 border-l-4 border-ni mb-4">
            <p className="text-ni font-bold font-mono text-sm mb-3">
              HPM = Subtotal DMT × (1 − MC/100)
            </p>
            <p className="text-muted font-mono text-[11px] mb-2">Subtotal DMT =</p>
            <div className="font-mono text-[11px] text-muted pl-3 leading-8">
              <div>+ Ni% × CF_Ni × HMA_Ni</div>
              <div>+ Fe% × CF_Fe × HMA_Fe × 100</div>
              <div>+ Co% × CF_Co × HMA_Co</div>
              <div>+ Cr% × CF_Cr × HMA_Cr × 100</div>
            </div>
          </div>

          <div className="font-mono text-[11px] text-muted space-y-1.5">
            <p>• <span className="text-white font-semibold">HMA</span> = Harga Mineral Acuan (KESDM 2x/bulan)</p>
            <p>• <span className="text-white font-semibold">CF</span> = Conversion Factor sesuai Kepmen</p>
            <p>• <span className="text-white font-semibold">DMT</span> = Dry Metric Ton</p>
            <p>• <span className="text-white font-semibold">WMT</span> = Wet Metric Ton</p>
            <p>• <span className="text-white font-semibold">MC</span> = Moisture Content</p>
          </div>
        </div>
      </div>

      <div>
        <div className="card">
          <div className="card-title">Syarat & Ketentuan</div>
          <div className="font-mono text-[11px] text-muted leading-relaxed space-y-4">
            <div>
              <p className="text-white font-semibold mb-1">Syarat Fe (Besi):</p>
              <p>Fe ≤ 35% — jika melebihi, komponen besi ikutan tidak diperhitungkan dalam HPM.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Syarat Co (Kobalt):</p>
              <p>Co ≥ 0.05% — jika di bawah batas, komponen kobalt ikutan tidak diperhitungkan.</p>
            </div>
            {/* <div className="bg-danger/8 border border-danger/25 rounded-xl p-3 text-red-400">
              ⚠ Kalkulator ini bersifat <span className="font-bold">referensi internal</span>. Selalu verifikasi dengan dokumen resmi Kepmen ESDM terbaru.
            </div> */}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Versi & Penyimpanan</div>
          <div className="font-mono text-[11px] text-muted space-y-1.5">
            <p>• Versi: <span className="text-white font-semibold">1.0.0</span></p>
            <p>• Dibuat dengan: <span className="text-white font-semibold">React + Tailwind CSS v3</span></p>
            <p>• Data tersimpan di <span className="text-white font-semibold">localStorage browser</span></p>
            <p>• Bekerja <span className="text-white font-semibold">100% offline</span></p>
            <p>• Backup via fitur <span className="text-white font-semibold">Export CSV</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
