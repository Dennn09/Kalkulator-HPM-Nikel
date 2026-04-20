import React from 'react';

const ELEMENTS = {
  ni: { label: 'Nikel (%)',           hint: 'Tipikal 1.20–2.00%',              max: 3,    step: '0.01',  placeholder: '0.00',  badgeClass: 'bg-ni/20 text-ni' },
  fe: { label: 'Besi — Fe (%)',       hint: 'Tipikal 10.00–30.00% · Fe ≤ 35%', max: 50,   step: '0.1',   placeholder: '0.00',  badgeClass: 'bg-fe/20 text-fe' },
  co: { label: 'Kobalt (%)',          hint: 'Tipikal 0.02–0.08% · Co ≥ 0.05%', max: 0.15, step: '0.001', placeholder: '0.000', badgeClass: 'bg-co/20 text-co' },
  cr: { label: 'Krom (%)',            hint: 'Tipikal 0.50–1.50%',              max: 3,    step: '0.01',  placeholder: '0.00',  badgeClass: 'bg-cr/20 text-cr' },
  mc: { label: 'Moisture Content (%)', hint: 'Tipikal 30.00–38.00%',           max: 60,   step: '0.1',   placeholder: '0.00',  badgeClass: 'bg-mc/20 text-mc' },
};

const COLORS = { ni: '#c8a84b', fe: '#e07a3a', co: '#7b9cf0', cr: '#4ec994', mc: '#a78bfa' };

function ConstraintBadge({ element, value }) {
  if (element === 'fe') {
    const ok = parseFloat(value) <= 35;
    return value !== '' ? (
      <span className={`badge ${ok ? 'badge-ok' : 'badge-warn'}`}>
        {ok ? 'Fe ≤35% ✓' : 'Fe >35% ✗'}
      </span>
    ) : null;
  }
  if (element === 'co') {
    const ok = parseFloat(value) >= 0.05;
    return value !== '' ? (
      <span className={`badge ${ok ? 'badge-ok' : 'badge-warn'}`}>
        {ok ? 'Co ≥0.05% ✓' : 'Co <0.05% ✗'}
      </span>
    ) : null;
  }
  return null;
}

function RangeBar({ element, value, max }) {
  const pct = Math.min(100, Math.max(0, ((parseFloat(value) || 0) / max) * 100));
  return (
    <div className="range-bar">
      <div
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
        style={{ width: `${pct}%`, background: COLORS[element] }}
      />
    </div>
  );
}

export default function InputKadar({ values, onChange }) {
  return (
    <div className="card">
      <div className="card-title">Input Kadar Bijah</div>

      {Object.entries(ELEMENTS).map(([key, cfg]) => (
        <div key={key} className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className={`element-badge ${cfg.badgeClass}`}>
                {key.toUpperCase()}
              </span>
              {cfg.label}
            </div>
            <ConstraintBadge element={key} value={values[key]} />
          </div>

          <input
            type="number"
            className="input-field"
            value={values[key]}
            placeholder={cfg.placeholder}
            step={cfg.step}
            min="0"
            max={cfg.max * 2}
            onChange={(e) => onChange(key, e.target.value)}
          />

          <RangeBar element={key} value={values[key]} max={cfg.max} />
          <p className="text-[10px] text-muted font-mono mt-1 tracking-wide">{cfg.hint}</p>
        </div>
      ))}
    </div>
  );
}
