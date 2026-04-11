const { getSupabaseAdminClient } = require('./_supabase');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from('usernames')
      .select('username')
      .order('created_at', { ascending: true });

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch usernames' });
    }

    return res.status(200).json({ usernames: data.map((row) => row.username) });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unexpected server error' });
  }
};
