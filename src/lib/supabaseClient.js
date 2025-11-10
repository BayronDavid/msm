import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // In server runtime this will throw early so developers notice missing env vars.
  // We keep this import-safe for client usage because NEXT_PUBLIC_* are exposed.
  // eslint-disable-next-line no-console
  console.warn("Supabase env variables are not set: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

const supabase = createClient(SUPABASE_URL || "", SUPABASE_ANON_KEY || "");

export default supabase;
