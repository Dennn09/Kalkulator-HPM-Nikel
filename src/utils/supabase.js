import { createClient } from '@supabase/supabase-js'

// Ganti dengan URL dan Key project Supabase Anda
// Ambil dari: Supabase Dashboard → Settings → API
const SUPABASE_URL  = process.env.REACT_APP_SUPABASE_URL
const SUPABASE_ANON = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON)
