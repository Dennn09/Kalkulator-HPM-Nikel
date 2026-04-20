import { supabase } from './supabase'

// ─── RIWAYAT ──────────────────────────────────────────

export async function getRiwayat() {
  const { data, error } = await supabase
    .from('riwayat_hpm')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) throw error
  return data
}

export async function simpanRiwayat(entry) {
  const { data: { user } } = await supabase.auth.getUser()

  // Format tanggal Indonesia
  const now = new Date()
  const tanggal = now.toLocaleString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false,
  })

  const { error } = await supabase
    .from('riwayat_hpm')
    .insert([{
      user_email: user?.email,
      user_name:  user?.email?.split('@')[0],
      periode:    entry.periode,
      ni:         entry.ni,
      fe:         entry.fe,
      co:         entry.co,
      cr:         entry.cr,
      mc:         entry.mc,
      hpm:        entry.hpm,
      catatan:    tanggal,
    }])
  if (error) throw error
}

export async function hapusRiwayat(id) {
  const { error } = await supabase
    .from('riwayat_hpm')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ─── HMA ──────────────────────────────────────────────

export async function getHMAActive() {
  const { data, error } = await supabase
    .from('pengaturan_hma')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  if (error) return null
  return data
}

export async function simpanHMA(hmaData) {
  const { data: { user } } = await supabase.auth.getUser()

  await supabase
    .from('pengaturan_hma')
    .update({ is_active: false })
    .eq('is_active', true)

  const { error } = await supabase
    .from('pengaturan_hma')
    .insert([{
      periode:     hmaData.period,
      hma_ni:      hmaData.ni,
      hma_fe:      hmaData.fe,
      hma_co:      hmaData.co,
      hma_cr:      hmaData.cr,
      cf_ni:       hmaData.cfNi,
      cf_fe:       hmaData.cfFe,
      cf_co:       hmaData.cfCo,
      cf_cr:       hmaData.cfCr,
      is_active:   true,
      dibuat_oleh: user?.email,
    }])
  if (error) throw error
}
