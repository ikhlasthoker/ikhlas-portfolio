/* ==========================================================================
   IKHLAS HASSAN — PREMIUM PORTFOLIO
   supabase-config.js — Supabase connection settings

   ⚠️ IMPORTANT: Paste your own Project URL and anon public key below.
   Get them from: Supabase Dashboard → Project Settings → API
   ========================================================================== */

const SUPABASE_URL = 'https://kvzvehrqibueecgrghai.supabase.co';       // e.g. https://xxxxxxxxxxxx.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_64M3GoFyig0ElDmGXuCT6A_tsbaK_NT
ANON KEY (secret key)';

// Creates a single shared Supabase client used across the site
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
