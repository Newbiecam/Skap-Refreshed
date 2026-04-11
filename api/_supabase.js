const { createClient } = require('@supabase/supabase-js');

let cachedClient;

function getSupabaseAdminClient() {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecret = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecret) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY');
  }

  cachedClient = createClient(supabaseUrl, supabaseSecret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}

module.exports = { getSupabaseAdminClient };
