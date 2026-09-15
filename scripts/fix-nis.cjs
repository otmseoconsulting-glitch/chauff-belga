const fs = require('fs');
const file = 'scripts/build-complete-316-migration.cjs';
let content = fs.readFileSync(file, 'utf8');

// Fix duplicates:
content = content.replace("{ nis: '25091', name: 'Hélécine'", "{ nis: '25034', name: 'Hélécine'");
content = content.replace("{ nis: '53065', name: 'Quévy'", "{ nis: '53084', name: 'Quévy'");
content = content.replace("{ nis: '56011', name: 'Belœil'", "{ nis: '51008', name: 'Belœil'");
content = content.replace("{ nis: '56016', name: 'Beaumont'", "{ nis: '56005', name: 'Beaumont'");
content = content.replace("{ nis: '62038', name: 'Flémalle'", "{ nis: '62120', name: 'Flémalle'");
content = content.replace("{ nis: '62038', name: 'Engis'", "{ nis: '61028', name: 'Engis'");
content = content.replace("{ nis: '92142', name: 'Gedinne'", "{ nis: '91053', name: 'Gedinne'");

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed duplicates in build-complete-316-migration.cjs');
