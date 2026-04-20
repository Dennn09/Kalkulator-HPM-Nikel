# ⛏ Kalkulator HPM Bijah Nikel
> React + Tailwind CSS v3 · Kepmen ESDM 144.K/2026

---

## 🚀 Cara Install & Jalankan

### Prasyarat
- **Node.js** versi 16 ke atas → https://nodejs.org
- **npm** (otomatis ikut saat install Node.js)

### Langkah-langkah

```bash
# 1. Masuk ke folder project
cd hpm-nikel

# 2. Install semua dependensi (hanya sekali)
npm install

# 3. Jalankan di browser (mode development)
npm start
```

Setelah `npm start`, browser akan otomatis membuka:
**http://localhost:3000**

---

## 🏗️ Build untuk Produksi (Offline)

```bash
npm run build
```

Hasilnya ada di folder `build/`. Buka `build/index.html` di browser untuk
menjalankan secara penuh offline.

---

## 📁 Struktur Project

```
hpm-nikel/
├── public/
│   └── index.html              ← HTML template
├── src/
│   ├── components/
│   │   ├── InputKadar.jsx      ← Form input Ni, Fe, Co, Cr, MC
│   │   ├── HMADisplay.jsx      ← Tampilan HMA aktif
│   │   ├── HasilHPM.jsx        ← Hasil perhitungan & HPM final
│   │   ├── TabHMA.jsx          ← Tab pengaturan HMA & CF
│   │   ├── TabRiwayat.jsx      ← Tab riwayat perhitungan
│   │   ├── TabInfo.jsx         ← Tab informasi & rumus
│   │   └── Toast.jsx           ← Notifikasi popup
│   ├── hooks/
│   │   ├── useLocalStorage.js  ← Hook simpan data ke browser
│   │   └── useToast.js         ← Hook notifikasi
│   ├── utils/
│   │   └── calc.js             ← Fungsi perhitungan HPM
│   ├── App.jsx                 ← Komponen utama
│   ├── index.js                ← Entry point React
│   └── index.css               ← Tailwind + styling global
├── tailwind.config.js          ← Konfigurasi Tailwind
├── postcss.config.js           ← Konfigurasi PostCSS
└── package.json                ← Dependensi project
```

---

## ✏️ Cara Edit

### Ubah Warna Tema
Edit file `tailwind.config.js` bagian `colors`:
```js
colors: {
  bg:      '#0f1117',  // Background utama
  ni:      '#c8a84b',  // Warna Nikel (emas)
  fe:      '#e07a3a',  // Warna Besi (oranye)
  co:      '#7b9cf0',  // Warna Kobalt (biru)
  cr:      '#4ec994',  // Warna Krom (hijau)
}
```

### Ubah Nama Aplikasi / Perusahaan
Edit `src/App.jsx`, cari baris:
```jsx
<h1 className="...">⛏ HPM Bijah Nikel</h1>
```

### Ubah Formula / Syarat
Edit `src/utils/calc.js`:
```js
const feOk = fe <= 35;   // Ubah 35 sesuai syarat
const coOk = co >= 0.05; // Ubah 0.05 sesuai syarat
```

### Ubah Default CF
Edit `src/App.jsx`:
```js
const DEFAULT_CF = { ni: 27, fe: 30, co: 30, cr: 10 };
```

---

## 💡 Tips VS Code

Install extension **ES7+ React/Redux/React-Native snippets** untuk
kemudahan coding React (shortcut `rafce` untuk buat komponen baru).

Install extension **Tailwind CSS IntelliSense** untuk autocomplete
class Tailwind saat mengetik.
