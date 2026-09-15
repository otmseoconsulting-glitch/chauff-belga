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

async function testPage() {
  const { data: commune, error } = await supabase
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

  console.log('Commune found:', commune?.name_fr);

  // Test generateCommuneContent
  const spintax = require('../lib/seo/spintax-data.ts');
  console.log('spintax-data loaded?');
}

testPage().catch(console.error);
