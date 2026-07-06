/* ==========================================================================
   IKHLAS HASSAN — PREMIUM PORTFOLIO
   supabase-config.js — Supabase connection settings

   ⚠️ IMPORTANT: Paste your own Project URL and anon public key below.
   Get them from: Supabase Dashboard → Project Settings → API
   ========================================================================== */

const SUPABASE_URL = 'PASTE_YOUR_PROJECT_URL_HERE';       // e.g. https://xxxxxxxxxxxx.supabase.co
const SUPABASE_ANON_KEY = 'PASTE_YOUR_ANON_PUBLIC_KEY_HERE';

// Creates a single shared Supabase client used across the site
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
