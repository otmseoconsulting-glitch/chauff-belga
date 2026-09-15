/**
 * Chauffagiste-Belga — Complete 316 Belgian Communes Seed Script
 * Covers:
 * - 19 Communes of Bruxelles-Capitale
 * - 27 Communes of Brabant Wallon
 * - 69 Communes of Hainaut
 * - 84 Communes of Liège
 * - 38 Communes of Namur
 * - 44 Communes of Luxembourg (Wallonie)
 * - 35 Communes of Brabant Flamand (Bruxelles Periphery & Rand)
 * Total: ~316 Communes with real GPS, NIS codes, postal codes, water hardness, and transit axes.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=([^\r\n]+)/)[1];
const serviceRoleKey = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=([^\r\n]+)/)[1];

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

console.log('Connecting to Supabase at:', supabaseUrl);

module.exports = { supabase };
