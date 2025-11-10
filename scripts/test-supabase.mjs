import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Load .env.local manually so this script can run outside Next.js
function loadEnvLocal(path = './.env.local') {
  try {
    const raw = fs.readFileSync(path, 'utf8');
    raw.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^\s*([A-Za-z_0-9]+)\s*=\s*(.*)\s*$/);
      if (!m) return;
      const key = m[1];
      let val = m[2] || '';
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    });
  } catch (e) {
    console.error('No .env.local found or could not read it:', e.message);
  }
}

loadEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

try {
  const res = await supabase.from('inventory').select('*').limit(5);
  if (res.error) {
    console.error('Supabase returned error:', res.error);
    process.exit(1);
  }
  console.log('Fetched rows:', Array.isArray(res.data) ? res.data.length : 0);
  console.log(res.data?.slice(0,3));
} catch (err) {
  console.error('Fetch failed:', err);
  process.exit(1);
}
