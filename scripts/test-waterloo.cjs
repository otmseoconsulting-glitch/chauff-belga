const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n');
const envVars = {};
for (const line of lines) {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    envVars[key] = val;
  }
}

const supabase = createClient(
  envVars['NEXT_PUBLIC_SUPABASE_URL'],
  envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY']
);

async function test() {
  const { data, error } = await supabase
    .from('communes')
    .select(`
      *,
      provinces (
        id,
        name_fr,
        name_nl,
        slug_fr
      )
    `)
    .eq('slug_fr', 'waterloo')
    .single();
  console.log('Waterloo data:', data, 'Error:', error);

  if (data) {
    const { data: nearby, error: nearbyErr } = await supabase.rpc('find_nearby_communes', {
      p_lat: data.latitude,
      p_lng: data.longitude,
      p_radius_km: 20,
      p_exclude_id: data.id,
      p_limit: 8
    });
    console.log('Nearby:', nearby, 'Error:', nearbyErr);
  }
}

test();
