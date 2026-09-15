const fs = require('fs');
const path = require('path');

const { ALL_MASTER, slugify } = require('./build-complete-316-migration.cjs');
const fbFile = path.resolve('lib/supabase/fallback-communes.ts');
const fbContent = fs.readFileSync(fbFile, 'utf8');

const startTag = 'const RAW_FALLBACK_COMMUNES = [';
const endTag = 'export const FALLBACK_COMMUNES: CommuneRecord[] = RAW_FALLBACK_COMMUNES.map';

const startIdx = fbContent.indexOf(startTag);
const endIdx = fbContent.indexOf(endTag);

if (startIdx === -1 || endIdx === -1) {
  console.error('Boundaries not found:', { startIdx, endIdx });
  process.exit(1);
}

const rawItems = [];
const seen = new Set();

for (const c of ALL_MASTER) {
  const slugFr = slugify(c.name);
  const slugNl = slugify(c.nl);
  if (seen.has(slugFr)) continue;
  seen.add(slugFr);

  const postals = JSON.stringify(c.postal);
  const transit = c.transit ? JSON.stringify(c.transit) : '[]';
  const nameFr = JSON.stringify(c.name);
  const nameNl = JSON.stringify(c.nl);

  rawItems.push(`  {
    id: 'c-${slugFr}',
    nis_code: '${c.nis}',
    name_fr: ${nameFr},
    name_nl: ${nameNl},
    slug_fr: '${slugFr}',
    slug_nl: '${slugNl}',
    postal_codes: ${postals},
    latitude: ${c.lat},
    longitude: ${c.lng},
    province_id: 'p-${c.prov_slug}',
    arrondissement_id: 'a-${c.prov_slug}',
    population: ${c.pop},
    area_km2: null,
    is_active: true,
    is_major_hub: ${c.hub ? 'true' : 'false'},
    water_hardness_fh: ${c.fh},
    transit_axes: ${transit},
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    provinces: {
      id: 'p-${c.prov_slug}',
      name_fr: '${c.prov_slug === 'bruxelles-capitale' ? 'Bruxelles-Capitale' : c.prov_slug === 'brabant-wallon' ? 'Brabant wallon' : c.prov_slug === 'hainaut' ? 'Hainaut' : c.prov_slug === 'liege' ? 'Liège' : c.prov_slug === 'namur' ? 'Namur' : c.prov_slug === 'luxembourg' ? 'Luxembourg' : 'Brabant flamand'}',
      name_nl: '${c.prov_slug}',
      slug_fr: '${c.prov_slug}',
    },
  }`);
}

const replacement = `const RAW_FALLBACK_COMMUNES = [\n` + rawItems.join(',\n') + `\n]\n\n`;

const newContent = fbContent.slice(0, startIdx) + replacement + fbContent.slice(endIdx);
fs.writeFileSync(fbFile, newContent, 'utf8');
console.log('Successfully updated fallback-communes.ts with', rawItems.length, 'communes!');
