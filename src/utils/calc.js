/**
 * Hitung HPM Bijah Nikel sesuai Kepmen ESDM 144.K/2026
 *
 * Verified (Ni:1.3, Fe:15, Co:0.05, Cr:1, MC:35):
 * Ni  = 1.30% × 27% × (16933.57/100) = 59.44 USD
 * Fe  = 15.00% × 30% × 1.58          =  7.11 USD
 * Co  = 0.05%  × 30% × (55852.86/100)=  8.38 USD
 * Cr  = 1.00%  × 10% × 6.37          =  0.64 USD
 * Subtotal                            = 75.56 USD/DMT
 * × (1 - 35%)                         × 0.65
 * HPM                                 = 49.12 USD/WMT ✓
 */
export function hitungHPM({ ni, fe, co, cr, mc }, hma, cf) {
  const feOk = fe <= 35;
  const coOk = co >= 0.05;

  const cfNi = cf.ni / 100;
  const cfFe = cf.fe / 100;
  const cfCo = cf.co / 100;
  const cfCr = cf.cr / 100;

  const valNi = ni * cfNi * (hma.ni / 100);
  const valFe = feOk ? fe * cfFe * hma.fe       : 0;
  const valCo = coOk ? co * cfCo * (hma.co / 100) : 0;
  const valCr = cr * cfCr * hma.cr;

  const subtotal = valNi + valFe + valCo + valCr;
  const mcFactor = 1 - mc / 100;
  const hpm      = subtotal * mcFactor;

  return { valNi, valFe, valCo, valCr, subtotal, mcFactor, hpm, feOk, coOk };
}

export function fmt(n) {
  return (n || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fmtId(n) {
  return (n || 0).toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getPeriodLabel() {
  const now    = new Date();
  const day    = now.getDate();
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sep','Okt','Nov','Des'];
  const period = day <= 15 ? 'P1' : 'P2';
  return `${day} ${months[now.getMonth()]} ${now.getFullYear()} · ${period}`;
}