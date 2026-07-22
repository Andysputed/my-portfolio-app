// api/keepalive.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Security Check: Ensure only Vercel's Cron engine can trigger this route
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error("Missing Supabase Environment Variables in Vercel!");
    }

    // Initialize Supabase inside the handler so it doesn't crash on cold start if env vars are missing
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_ANON_KEY
    );

    // Run an incredibly tiny query on your projects table to wake up Postgres
    const { data, error } = await supabase
      .from('projects') 
      .select('id')
      .limit(1);

    if (error) throw error;

    return res.status(200).json({ success: true, message: 'Database tickled successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}