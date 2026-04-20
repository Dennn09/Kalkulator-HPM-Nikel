import React from 'react';
import { fmtId } from '../utils/calc';

export default function HMADisplay({ hma }) {
  const items = [
    { label: 'NIKEL (USD/dmt)',      value: hma.ni, color: 'text-ni' },
    { label: 'BIJAH BESI (USD/dmt)', value: hma.fe, color: 'text-fe' },
    { label: 'KOBALT (USD/dmt)',     value: hma.co, color: 'text-co' },
    { label: 'KROM (USD/dmt)',       value: hma.cr, color: 'text-cr' },
  ];

  return (
    <div className="card">
      <div className="card-title">HMA Aktif</div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-mono text-[10px] text-muted tracking-wider uppercase mb-1">
              {item.label}
            </p>
            <p className={`font-mono text-xl font-bold ${item.color}`}>
              {fmtId(item.value)}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted font-mono">
        Periode:{' '}
        <span className="text-ni font-semibold">{hma.period || '—'}</span>
      </p>
    </div>
  );
}
