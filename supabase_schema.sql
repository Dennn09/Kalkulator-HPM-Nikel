-- =============================================
-- TABEL: riwayat_hpm
-- Menyimpan semua hasil perhitungan HPM
-- =============================================
CREATE TABLE riwayat_hpm (
  id          BIGSERIAL PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  user_email  TEXT,
  user_name   TEXT,
  periode     TEXT,
  ni          NUMERIC(10,4),
  fe          NUMERIC(10,4),
  co          NUMERIC(10,6),
  cr          NUMERIC(10,4),
  mc          NUMERIC(10,4),
  hpm         NUMERIC(12,4),
  catatan     TEXT
);

-- =============================================
-- TABEL: pengaturan_hma
-- Menyimpan nilai HMA per periode
-- =============================================
CREATE TABLE pengaturan_hma (
  id          BIGSERIAL PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  periode     TEXT NOT NULL,
  hma_ni      NUMERIC(12,4),
  hma_fe      NUMERIC(12,4),
  hma_co      NUMERIC(12,4),
  hma_cr      NUMERIC(12,4),
  cf_ni       NUMERIC(6,2) DEFAULT 27,
  cf_fe       NUMERIC(6,2) DEFAULT 30,
  cf_co       NUMERIC(6,2) DEFAULT 30,
  cf_cr       NUMERIC(6,2) DEFAULT 10,
  is_active   BOOLEAN DEFAULT TRUE,
  dibuat_oleh TEXT
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- Hanya user yang login bisa akses data
-- =============================================
ALTER TABLE riwayat_hpm    ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengaturan_hma ENABLE ROW LEVEL SECURITY;

-- Policy: semua user yg login bisa baca semua data
CREATE POLICY "Authenticated can read riwayat"
  ON riwayat_hpm FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Authenticated can insert riwayat"
  ON riwayat_hpm FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can delete own riwayat"
  ON riwayat_hpm FOR DELETE
  TO authenticated USING (auth.email() = user_email);

CREATE POLICY "Authenticated can read hma"
  ON pengaturan_hma FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Authenticated can manage hma"
  ON pengaturan_hma FOR ALL
  TO authenticated USING (true);

-- =============================================
-- Contoh data HMA awal (opsional)
-- =============================================
INSERT INTO pengaturan_hma (periode, hma_ni, hma_fe, hma_co, hma_cr, cf_ni, cf_fe, cf_co, cf_cr, dibuat_oleh)
VALUES ('April 2026 P2', 16933.57, 1.58, 55852.86, 6.37, 27, 30, 30, 10, 'admin');
