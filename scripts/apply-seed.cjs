const { supabase } = require('./seed-300-communes.cjs');
const { ALL_COMMUNES_DATA, slugify } = require('./generate-300-communes.cjs');

async function applySeed() {
  console.log('Fetching provinces and arrondissements...');
  const { data: provinces } = await supabase.from('provinces').select('id, nis_code');
  const provMap = new Map((provinces || []).map((p) => [p.nis_code, p.id]));

  // Ensure missing arrondissements exist
  const missingArr = [
    { nis_code: '08000', name_fr: 'Arlon', name_nl: 'Aarlen', slug_fr: 'arlon', slug_nl: 'aarlen', province_id: provMap.get('08') },
    { nis_code: '23000', name_fr: 'Hal-Vilvorde', name_nl: 'Halle-Vilvoorde', slug_fr: 'hal-vilvorde', slug_nl: 'halle-vilvoorde', province_id: provMap.get('20') },
    { nis_code: '24000', name_fr: 'Louvain', name_nl: 'Leuven', slug_fr: 'louvain', slug_nl: 'leuven', province_id: provMap.get('20') },
  ];

  for (const arr of missingArr) {
    if (arr.province_id) {
      await supabase.from('arrondissements').upsert(arr, { onConflict: 'nis_code' });
    }
  }

  const { data: arrondissements } = await supabase.from('arrondissements').select('id, nis_code');
  const arrMap = new Map((arrondissements || []).map((a) => [a.nis_code, a.id]));

  // Fetch all existing communes in DB
  const { data: existingCommunes } = await supabase.from('communes').select('id, slug_fr, nis_code');
  const existingBySlug = new Map((existingCommunes || []).map((c) => [c.slug_fr, c]));
  const existingNisCodes = new Set((existingCommunes || []).map((c) => c.nis_code));

  console.log('Existing communes in DB:', existingCommunes ? existingCommunes.length : 0);

  let updatedCount = 0;
  let insertedCount = 0;

  for (const c of ALL_COMMUNES_DATA) {
    const slug = slugify(c.name);
    const slugNl = slugify(c.nl);
    const existing = existingBySlug.get(slug);

    if (existing) {
      // Update existing by its primary key id
      const { error } = await supabase.from('communes').update({
        postal_codes: c.postal,
        latitude: c.lat,
        longitude: c.lng,
        population: c.pop,
        is_major_hub: Boolean(c.hub),
        water_hardness_fh: c.fh,
        transit_axes: c.transit || [],
        is_active: true,
      }).eq('id', existing.id);

      if (!error) updatedCount++;
      else console.error('Error updating', slug, error);
    } else {
      // Generate a unique nis_code if needed
      let finalNis = c.nis;
      if (existingNisCodes.has(finalNis)) {
        finalNis = '9' + finalNis.slice(1);
      }
      existingNisCodes.add(finalNis);

      const { error } = await supabase.from('communes').insert({
        nis_code: finalNis,
        name_fr: c.name,
        name_nl: c.nl,
        slug_fr: slug,
        slug_nl: slugNl,
        postal_codes: c.postal,
        latitude: c.lat,
        longitude: c.lng,
        population: c.pop,
        is_major_hub: Boolean(c.hub),
        water_hardness_fh: c.fh,
        transit_axes: c.transit || [],
        is_active: true,
        province_id: provMap.get(c.province_nis),
        arrondissement_id: arrMap.get(c.arr_nis) || null,
      });

      if (!error) insertedCount++;
      else console.error('Error inserting', slug, error);
    }
  }

  console.log(`Updated: ${updatedCount}, Inserted: ${insertedCount}`);

  // Sync pseo_pages
  const { data: allCommunes } = await supabase.from('communes').select('id, slug_fr');
  if (allCommunes) {
    const pseoRows = allCommunes.map((c) => ({
      commune_id: c.id,
      full_slug: `chauffagiste-${c.slug_fr}`,
      page_type: 'commune',
      is_published: true,
      is_indexed: true,
    }));

    for (let j = 0; j < pseoRows.length; j += 50) {
      await supabase.from('pseo_pages').upsert(pseoRows.slice(j, j + 50), { onConflict: 'full_slug', ignoreDuplicates: true });
    }
  }

  const { count } = await supabase.from('communes').select('*', { count: 'exact', head: true });
  console.log('Total communes in Supabase now:', count);
}

applySeed().catch(console.error);
