const { getSupabaseAdminClient } = require('./_supabase');

function sanitizeUsernameInput(value = '') {
  return String(value).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const username = sanitizeUsernameInput(req.body?.username || '');

  if (!username || username.length < 1 || username.length > 16) {
    return res.status(400).json({ error: 'Username must be 1-16 alphanumeric characters' });
  }

  try {
    const supabase = getSupabaseAdminClient();

    const { data: existing, error: selectError } = await supabase
      .from('usernames')
      .select('id')
      .eq('username', username)
      .maybeSingle();

    if (selectError) {
      return res.status(500).json({ error: 'Failed to validate username availability' });
    }

    if (existing) {
      return res.status(409).json({ error: 'Username is already taken' });
    }

    const { error: insertError } = await supabase
      .from('usernames')
      .insert({ username });

    if (insertError) {
      return res.status(500).json({ error: 'Failed to claim username' });
    }

    return res.status(201).json({ success: true, username });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unexpected server error' });
  }
};
