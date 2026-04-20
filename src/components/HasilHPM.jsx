import React from 'react';
import { fmt } from '../utils/calc';

function ResultCard({ colorClass, borderColor, badgeClass, symbol, label, value, formula, warning }) {
  return (
    <div className={`result-card border-l-[3px]`} style={{ borderLeftColor: borderColor }}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-sm font-bold">
          <span className={`element-badge ${badgeClass}`}>{symbol}</span>
          {label}
        </div>
        <span className={`font-mono text-xl font-bold ${colorClass}`}>{fmt(value)} USD</span>
      </div>
      <div className="flex flex-wrap gap-1 items-center font-mono text-[10px] text-muted">
        {formula}
      </div>
      {warning && (
        <p className="text-[10px] font-mono text-danger mt-1 bg-danger/10 rounded px-2 py-1">
          {warning}
        </p>
      )}
    </div>
  );
}

function FormulaChip({ children, className }) {
  return (
    <span className={`formula-chip ${className}`}>{children}</span>
  );
}

export default function HasilHPM({ result, inputs, hma, cf, onSave, onCopy, onCetak }) {
  const { valNi, valFe, valCo, valCr, subtotal, mcFactor, hpm, feOk, coOk } = result;

  return (
    <div className="card animate-fade-in">
      <div className="card-title">Perhitungan HPM — Kepmen 144.K/2026</div>

      {/* NIKEL */}
      <ResultCard
        borderColor="#c8a84b"
        badgeClass="bg-ni/20 text-ni"
        colorClass="text-ni"
        symbol="Ni"
        label="Nikel"
        value={valNi}
        formula={
          <>
            <FormulaChip className="bg-ni/20 text-ni">{inputs.ni || '0'}%</FormulaChip>
            <span>×</span>
            <FormulaChip className="bg-ni/20 text-ni">CF {cf.ni}%</FormulaChip>
            <span>× HMA</span>
            <span>{fmt(hma.ni)}</span>
          </>
        }
      />

      {/* BESI */}
      <ResultCard
        borderColor="#e07a3a"
        badgeClass="bg-fe/20 text-fe"
        colorClass="text-fe"
        symbol="Fe"
        label="Besi Ikutan"
        value={valFe}
        formula={
          <>
            <FormulaChip className="bg-fe/20 text-fe">{inputs.fe || '0'}%</FormulaChip>
            <span>×</span>
            <FormulaChip className="bg-fe/20 text-fe">CF {cf.fe}%</FormulaChip>
            <span>× HMA {fmt(hma.fe)} × 100</span>
          </>
        }
        warning={!feOk ? 'Fe >35% — komponen besi tidak dihitung' : null}
      />

      {/* KOBALT */}
      <ResultCard
        borderColor="#7b9cf0"
        badgeClass="bg-co/20 text-co"
        colorClass="text-co"
        symbol="Co"
        label="Kobalt Ikutan"
        value={valCo}
        formula={
          <>
            <FormulaChip className="bg-co/20 text-co">{inputs.co || '0'}%</FormulaChip>
            <span>×</span>
            <FormulaChip className="bg-co/20 text-co">CF {cf.co}%</FormulaChip>
            <span>× HMA {fmt(hma.co)}</span>
          </>
        }
        warning={!coOk && (parseFloat(inputs.co) > 0) ? 'Co <0.05% — komponen kobalt tidak dihitung' : null}
      />

      {/* KROM */}
      <ResultCard
        borderColor="#4ec994"
        badgeClass="bg-cr/20 text-cr"
        colorClass="text-cr"
        symbol="Cr"
        label="Krom Ikutan"
        value={valCr}
        formula={
          <>
            <FormulaChip className="bg-cr/20 text-cr">{inputs.cr || '0'}%</FormulaChip>
            <span>×</span>
            <FormulaChip className="bg-cr/20 text-cr">CF {cf.cr}%</FormulaChip>
            <span>× HMA {fmt(hma.cr)} × 100</span>
          </>
        }
      />

      {/* SUBTOTAL */}
      <div className="bg-surface2 border border-border rounded-xl p-4 mt-2">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="font-mono text-[11px] text-muted">SUBTOTAL — BASIS DMT</span>
          <span className="font-mono font-semibold">{fmt(subtotal)} USD/DMT</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-mono text-[11px] text-muted">× Faktor MC ({inputs.mc || 0}%)</span>
          <span className="font-mono font-semibold">×{mcFactor.toFixed(4)}</span>
        </div>
      </div>

      {/* FINAL */}
      <div className="mt-3 rounded-2xl p-5 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(200,168,75,0.15), rgba(200,168,75,0.05))', border: '1.5px solid rgba(200,168,75,0.4)' }}>
        <p className="font-mono text-[10px] tracking-[2px] uppercase text-muted mb-1">
          HPM BIJAH NIKEL — BARU
        </p>
        <p className="font-mono text-[11px] text-muted mb-3">Kepmen ESDM 144.K/2026</p>
        <div className="flex items-baseline justify-center gap-2">
          <span className="font-mono font-bold text-ni leading-none"
            style={{ fontSize: '3rem', letterSpacing: '-2px' }}>
            {hpm.toFixed(2)}
          </span>
          <span className="text-muted text-base">USD/WMT</span>
        </div>

        <div className="flex gap-3 justify-center mt-4 flex-wrap">
          <button
            onClick={onCopy}
            className="btn px-5 py-2 text-ni font-bold text-sm rounded-lg transition-all"
            style={{ background: 'rgba(200,168,75,0.15)', border: '1px solid rgba(200,168,75,0.35)' }}
          >
            📋 Salin Hasil
          </button>
          <button
            onClick={onCetak}
            className="btn px-5 py-2 text-cr font-bold text-sm rounded-lg transition-all"
            style={{ background: 'rgba(78,201,148,0.12)', border: '1px solid rgba(78,201,148,0.3)' }}
          >
            🖨 Cetak
          </button>
        </div>
      </div>

      <button
        onClick={onSave}
        className="w-full mt-3 py-3 rounded-xl font-bold text-sm text-ni transition-all"
        style={{ background: 'rgba(200,168,75,0.1)', border: '1.5px dashed rgba(200,168,75,0.3)' }}
        onMouseEnter={e => e.target.style.borderStyle = 'solid'}
        onMouseLeave={e => e.target.style.borderStyle = 'dashed'}
      >
        💾 Simpan ke Riwayat
      </button>
    </div>
  );
}
