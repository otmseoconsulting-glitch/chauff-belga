const fs = require('fs');
const path = require('path');

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

// ==========================================
// 1. BRUXELLES-CAPITALE (19 Communes)
// ==========================================
const BRUXELLES_19 = [
  { nis: '21004', name: 'Bruxelles', nl: 'Brussel', postal: ['1000','1020','1120','1130'], lat: 50.8503, lng: 4.3517, pop: 185103, hub: true, fh: 32, transit: ['R0','A12','E19'] },
  { nis: '21001', name: 'Anderlecht', nl: 'Anderlecht', postal: ['1070'], lat: 50.8364, lng: 4.3074, pop: 120455, hub: false, fh: 30, transit: ['R0','N6'] },
  { nis: '21002', name: 'Auderghem', nl: 'Oudergem', postal: ['1160'], lat: 50.8167, lng: 4.4333, pop: 34400, hub: false, fh: 28, transit: ['E411','R0'] },
  { nis: '21003', name: 'Berchem-Sainte-Agathe', nl: 'Sint-Agatha-Berchem', postal: ['1082'], lat: 50.8653, lng: 4.2936, pop: 25500, hub: false, fh: 29, transit: ['R0','N9'] },
  { nis: '21005', name: 'Etterbeek', nl: 'Etterbeek', postal: ['1040'], lat: 50.8364, lng: 4.3894, pop: 48500, hub: false, fh: 28, transit: ['N3','N4'] },
  { nis: '21006', name: 'Evere', nl: 'Evere', postal: ['1140'], lat: 50.8719, lng: 4.4031, pop: 42600, hub: false, fh: 30, transit: ['R21','N2'] },
  { nis: '21007', name: 'Forest', nl: 'Vorst', postal: ['1190'], lat: 50.8114, lng: 4.3189, pop: 56500, hub: false, fh: 29, transit: ['R0','N5'] },
  { nis: '21008', name: 'Ganshoren', nl: 'Ganshoren', postal: ['1083'], lat: 50.8717, lng: 4.3094, pop: 25100, hub: false, fh: 30, transit: ['R0','N9'] },
  { nis: '21009', name: 'Ixelles', nl: 'Elsene', postal: ['1050'], lat: 50.8236, lng: 4.3726, pop: 89120, hub: false, fh: 29, transit: ['N4','N24'] },
  { nis: '21010', name: 'Jette', nl: 'Jette', postal: ['1090'], lat: 50.8767, lng: 4.3314, pop: 52700, hub: false, fh: 30, transit: ['R0','A12'] },
  { nis: '21011', name: 'Koekelberg', nl: 'Koekelberg', postal: ['1081'], lat: 50.8614, lng: 4.3297, pop: 22000, hub: false, fh: 30, transit: ['N9','R20'] },
  { nis: '21012', name: 'Molenbeek-Saint-Jean', nl: 'Sint-Jans-Molenbeek', postal: ['1080'], lat: 50.8523, lng: 4.3222, pop: 98671, hub: false, fh: 30, transit: ['R0','N8'] },
  { nis: '21013', name: 'Saint-Gilles', nl: 'Sint-Gillis', postal: ['1060'], lat: 50.8258, lng: 4.3458, pop: 50000, hub: false, fh: 29, transit: ['N5','R20'] },
  { nis: '21014', name: 'Saint-Josse-ten-Noode', nl: 'Sint-Joost-ten-Node', postal: ['1210'], lat: 50.8519, lng: 4.3708, pop: 27500, hub: false, fh: 30, transit: ['R20','N2'] },
  { nis: '21015', name: 'Schaerbeek', nl: 'Schaarbeek', postal: ['1030'], lat: 50.8675, lng: 4.3789, pop: 133657, hub: false, fh: 30, transit: ['N2','N22'] },
  { nis: '21016', name: 'Uccle', nl: 'Ukkel', postal: ['1180'], lat: 50.7985, lng: 4.3625, pop: 83703, hub: false, fh: 28, transit: ['N5','R0'] },
  { nis: '21017', name: 'Watermael-Boitsfort', nl: 'Watermaal-Bosvoorde', postal: ['1170'], lat: 50.8033, lng: 4.4103, pop: 25200, hub: false, fh: 28, transit: ['E411','R0'] },
  { nis: '21018', name: 'Woluwe-Saint-Lambert', nl: 'Sint-Lambrechts-Woluwe', postal: ['1200'], lat: 50.8447, lng: 4.4317, pop: 58500, hub: false, fh: 29, transit: ['E40','R0'] },
  { nis: '21019', name: 'Woluwe-Saint-Pierre', nl: 'Sint-Pieters-Woluwe', postal: ['1150'], lat: 50.8319, lng: 4.4536, pop: 42000, hub: false, fh: 28, transit: ['E411','R0'] },
];

// ==========================================
// 2. BRABANT WALLON (All 27 Communes)
// ==========================================
const BRABANT_WALLON_27 = [
  { nis: '25119', name: 'Waterloo', nl: 'Waterloo', postal: ['1410'], lat: 50.7167, lng: 4.3986, pop: 30376, hub: true, fh: 28, transit: ['R0','N5'] },
  { nis: '25112', name: 'Wavre', nl: 'Waver', postal: ['1300','1301'], lat: 50.7175, lng: 4.6122, pop: 34748, hub: true, fh: 26, transit: ['E411','N25'] },
  { nis: '25014', name: "Braine-l'Alleud", nl: 'Eigenbrakel', postal: ['1420','1421','1428'], lat: 50.6833, lng: 4.3667, pop: 40346, hub: true, fh: 28, transit: ['R0','N5'] },
  { nis: '25072', name: 'Nivelles', nl: 'Nijvel', postal: ['1400','1401','1402','1404'], lat: 50.5978, lng: 4.3236, pop: 29085, hub: true, fh: 27, transit: ['E19','N25'] },
  { nis: '25105', name: 'Tubize', nl: 'Tubeke', postal: ['1480'], lat: 50.6917, lng: 4.2056, pop: 27774, hub: true, fh: 29, transit: ['E19','N6'] },
  { nis: '25121', name: 'Ottignies-Louvain-la-Neuve', nl: 'Ottignies-Louvain-la-Neuve', postal: ['1340','1341','1342','1348'], lat: 50.6667, lng: 4.5667, pop: 31385, hub: true, fh: 25, transit: ['E411','N25'] },
  { nis: '25091', name: 'Rixensart', nl: 'Rixensart', postal: ['1330','1331','1332'], lat: 50.7167, lng: 4.5333, pop: 22861, hub: false, fh: 26, transit: ['N275'] },
  { nis: '25037', name: 'Grez-Doiceau', nl: 'Graven', postal: ['1390'], lat: 50.7333, lng: 4.6833, pop: 13996, hub: false, fh: 27, transit: ['N25'] },
  { nis: '25043', name: 'Jodoigne', nl: 'Geldenaken', postal: ['1370'], lat: 50.7250, lng: 4.8667, pop: 14450, hub: false, fh: 29, transit: ['N29'] },
  { nis: '25048', name: 'La Hulpe', nl: 'Terhulpen', postal: ['1310'], lat: 50.7333, lng: 4.4833, pop: 7434, hub: false, fh: 27, transit: ['N275'] },
  { nis: '25110', name: 'Villers-la-Ville', nl: 'Villers-la-Ville', postal: ['1495'], lat: 50.5833, lng: 4.5333, pop: 10877, hub: false, fh: 25, transit: ['N273'] },
  { nis: '25031', name: 'Genappe', nl: 'Genepiën', postal: ['1470','1471','1472','1473','1474','1476'], lat: 50.6167, lng: 4.4500, pop: 15611, hub: false, fh: 27, transit: ['N5','N25'] },
  { nis: '25015', name: 'Braine-le-Château', nl: 'Kasteelbrakel', postal: ['1440'], lat: 50.6833, lng: 4.2667, pop: 10565, hub: false, fh: 28, transit: ['N6','R0'] },
  { nis: '25023', name: 'Court-Saint-Étienne', nl: 'Court-Saint-Étienne', postal: ['1490'], lat: 50.6500, lng: 4.5667, pop: 10606, hub: false, fh: 26, transit: ['N25'] },
  { nis: '25050', name: 'Lasne', nl: 'Lasne', postal: ['1380'], lat: 50.6833, lng: 4.4833, pop: 14243, hub: false, fh: 27, transit: ['N271'] },
  { nis: '25068', name: 'Mont-Saint-Guibert', nl: 'Mont-Saint-Guibert', postal: ['1435'], lat: 50.6333, lng: 4.6167, pop: 7824, hub: false, fh: 26, transit: ['E411','N4'] },
  { nis: '25084', name: 'Perwez', nl: 'Perwijs', postal: ['1360'], lat: 50.6333, lng: 4.8167, pop: 9442, hub: false, fh: 28, transit: ['E411','N29'] },
  { nis: '25018', name: 'Chastre', nl: 'Chastre', postal: ['1450'], lat: 50.6000, lng: 4.6333, pop: 7729, hub: false, fh: 26, transit: ['N4'] },
  { nis: '25017', name: 'Chaumont-Gistoux', nl: 'Chaumont-Gistoux', postal: ['1325'], lat: 50.6833, lng: 4.7167, pop: 11685, hub: false, fh: 26, transit: ['E411','N243'] },
  { nis: '25005', name: 'Beauvechain', nl: 'Bevekom', postal: ['1320'], lat: 50.7833, lng: 4.7667, pop: 7277, hub: false, fh: 28, transit: ['N25'] },
  { nis: '25118', name: 'Walhain', nl: 'Walhain', postal: ['1457'], lat: 50.6167, lng: 4.7000, pop: 7466, hub: false, fh: 26, transit: ['E411','N4'] },
  { nis: '25096', name: 'Ramillies', nl: 'Ramillies', postal: ['1367'], lat: 50.6333, lng: 4.9167, pop: 6620, hub: false, fh: 29, transit: ['N91'] },
  { nis: '25044', name: 'Incourt', nl: 'Incourt', postal: ['1315'], lat: 50.6833, lng: 4.8000, pop: 5524, hub: false, fh: 28, transit: ['N91'] },
  { nis: '25045', name: 'Ittre', nl: 'Itter', postal: ['1460','1461'], lat: 50.6500, lng: 4.2667, pop: 7024, hub: false, fh: 27, transit: ['RO','E19'] },
  { nis: '25034', name: 'Hélécine', nl: 'Heilissem', postal: ['1357'], lat: 50.7500, lng: 4.9833, pop: 3672, hub: false, fh: 29, transit: ['E40'] },
  { nis: '25081', name: 'Orp-Jauche', nl: 'Orp-Jauche', postal: ['1350'], lat: 50.7000, lng: 4.9667, pop: 9002, hub: false, fh: 29, transit: ['N29'] },
  { nis: '25099', name: 'Rebecq', nl: 'Roosbeek', postal: ['1430'], lat: 50.6667, lng: 4.1333, pop: 11054, hub: false, fh: 28, transit: ['A8','E429'] },
];

// ==========================================
// 3. HAINAUT (All 69 Communes)
// ==========================================
const HAINAUT_69 = [
  { nis: '52011', name: 'Charleroi', nl: 'Charleroi', postal: ['6000','6001','6010','6020','6030','6031','6032','6040','6041','6042','6043','6044','6060','6061'], lat: 50.4108, lng: 4.4446, pop: 202421, hub: true, fh: 22, transit: ['R9','R3','E420','E42'] },
  { nis: '53053', name: 'Mons', nl: 'Bergen', postal: ['7000','7011','7012','7020','7021','7022','7024','7030','7031','7032','7033','7034'], lat: 50.4542, lng: 3.9562, pop: 95883, hub: true, fh: 24, transit: ['E19','E42','R5'] },
  { nis: '57081', name: 'Tournai', nl: 'Doornik', postal: ['7500','7501','7502','7503','7504','7506','7520','7521','7522','7530','7531','7532','7533','7534','7536','7538','7540','7542','7543','7548'], lat: 50.6056, lng: 3.3892, pop: 69083, hub: true, fh: 26, transit: ['E42','A8','E403'] },
  { nis: '54007', name: 'Mouscron', nl: 'Moeskroen', postal: ['7700','7711','7712'], lat: 50.7444, lng: 3.2208, pop: 59000, hub: true, fh: 27, transit: ['E403','A17'] },
  { nis: '55022', name: 'La Louvière', nl: 'La Louvière', postal: ['7100','7110'], lat: 50.4794, lng: 4.1847, pop: 80944, hub: true, fh: 23, transit: ['E42','E19'] },
  { nis: '52012', name: 'Châtelet', nl: 'Châtelet', postal: ['6200'], lat: 50.4000, lng: 4.5167, pop: 35700, hub: false, fh: 22, transit: ['R3','N5'] },
  { nis: '52015', name: 'Courcelles', nl: 'Courcelles', postal: ['6180','6181','6182','6183'], lat: 50.4667, lng: 4.3667, pop: 31000, hub: false, fh: 22, transit: ['E42','R3'] },
  { nis: '52021', name: 'Fleurus', nl: 'Fleurus', postal: ['6220','6221','6222','6223','6224'], lat: 50.4833, lng: 4.5500, pop: 22800, hub: false, fh: 24, transit: ['E42','N29'] },
  { nis: '56011', name: 'Binche', nl: 'Binche', postal: ['7130','7131','7133','7134'], lat: 50.4167, lng: 4.1667, pop: 33500, hub: false, fh: 24, transit: ['N55','N90'] },
  { nis: '51004', name: 'Ath', nl: 'Aat', postal: ['7800','7801','7802','7803','7804','7810','7811','7812','7822','7823'], lat: 50.6333, lng: 3.7833, pop: 29500, hub: true, fh: 26, transit: ['A8','N7'] },
  { nis: '55040', name: 'Soignies', nl: 'Zinnik', postal: ['7060','7061','7062','7063'], lat: 50.5833, lng: 4.0667, pop: 28000, hub: true, fh: 25, transit: ['N6','N57'] },
  { nis: '55004', name: "Braine-le-Comte", nl: "'s-Gravenbrakel", postal: ['7090'], lat: 50.6167, lng: 4.1333, pop: 22500, hub: false, fh: 26, transit: ['N6','A8'] },
  { nis: '55010', name: 'Écaussinnes', nl: 'Écaussinnes', postal: ['7190','7191'], lat: 50.5667, lng: 4.1667, pop: 11000, hub: false, fh: 25, transit: ['E19'] },
  { nis: '55085', name: 'Manage', nl: 'Manage', postal: ['7170'], lat: 50.5000, lng: 4.2333, pop: 23500, hub: false, fh: 23, transit: ['E42','E19'] },
  { nis: '55086', name: 'Seneffe', nl: 'Seneffe', postal: ['7180','7181'], lat: 50.5333, lng: 4.2667, pop: 11500, hub: false, fh: 24, transit: ['E19','A54'] },
  { nis: '55068', name: 'Le Rœulx', nl: 'Le Rœulx', postal: ['7070'], lat: 50.5000, lng: 4.1167, pop: 8700, hub: false, fh: 24, transit: ['E19'] },
  { nis: '52022', name: 'Fontaine-l’Évêque', nl: 'Fontaine-l’Évêque', postal: ['6140','6141','6142'], lat: 50.4167, lng: 4.3167, pop: 18000, hub: false, fh: 22, transit: ['N90','R3'] },
  { nis: '52025', name: 'Gerpinnes', nl: 'Gerpinnes', postal: ['6280'], lat: 50.3333, lng: 4.5333, pop: 12800, hub: false, fh: 23, transit: ['N5'] },
  { nis: '52048', name: 'Montigny-le-Tilleul', nl: 'Montigny-le-Tilleul', postal: ['6110','6111'], lat: 50.3833, lng: 4.3833, pop: 10200, hub: false, fh: 22, transit: ['R3','N53'] },
  { nis: '52055', name: 'Pont-à-Celles', nl: 'Pont-à-Celles', postal: ['6230'], lat: 50.5167, lng: 4.3667, pop: 17500, hub: false, fh: 23, transit: ['A54','E42'] },
  { nis: '52044', name: 'Les Bons Villers', nl: 'Les Bons Villers', postal: ['6210','6211'], lat: 50.5333, lng: 4.4500, pop: 9500, hub: false, fh: 24, transit: ['A54','N5'] },
  { nis: '52010', name: 'Chapelle-lez-Herlaimont', nl: 'Chapelle-lez-Herlaimont', postal: ['7160'], lat: 50.4667, lng: 4.2833, pop: 14700, hub: false, fh: 23, transit: ['E42'] },
  { nis: '52029', name: 'Ham-sur-Heure-Nalinnes', nl: 'Ham-sur-Heure-Nalinnes', postal: ['6120'], lat: 50.3167, lng: 4.3833, pop: 13600, hub: false, fh: 22, transit: ['N5'] },
  { nis: '52003', name: 'Aiseau-Presles', nl: 'Aiseau-Presles', postal: ['6250'], lat: 50.4167, lng: 4.5833, pop: 10800, hub: false, fh: 23, transit: ['N90'] },
  { nis: '52018', name: 'Farciennes', nl: 'Farciennes', postal: ['6240'], lat: 50.4333, lng: 4.5500, pop: 11400, hub: false, fh: 22, transit: ['N90'] },
  { nis: '53014', name: 'Boussu', nl: 'Boussu', postal: ['7300','7301'], lat: 50.4333, lng: 3.8000, pop: 20000, hub: false, fh: 24, transit: ['N51','A7'] },
  { nis: '53020', name: 'Colfontaine', nl: 'Colfontaine', postal: ['7340'], lat: 50.4000, lng: 3.8500, pop: 20700, hub: false, fh: 24, transit: ['N544'] },
  { nis: '53028', name: 'Dour', nl: 'Dour', postal: ['7370'], lat: 50.4000, lng: 3.7833, pop: 16700, hub: false, fh: 24, transit: ['N552'] },
  { nis: '53039', name: 'Frameries', nl: 'Frameries', postal: ['7080'], lat: 50.4167, lng: 3.9000, pop: 22000, hub: false, fh: 24, transit: ['N546','R5'] },
  { nis: '53065', name: 'Quaregnon', nl: 'Quaregnon', postal: ['7390'], lat: 50.4444, lng: 3.8667, pop: 19000, hub: false, fh: 24, transit: ['N51','A7'] },
  { nis: '53070', name: 'Saint-Ghislain', nl: 'Saint-Ghislain', postal: ['7330','7331','7332','7333','7334'], lat: 50.4500, lng: 3.8167, pop: 23500, hub: false, fh: 24, transit: ['E19','A7'] },
  { nis: '53068', name: 'Quiévrain', nl: 'Quiévrain', postal: ['7380','7382'], lat: 50.4000, lng: 3.6833, pop: 6700, hub: false, fh: 25, transit: ['N51'] },
  { nis: '53044', name: 'Hensies', nl: 'Hensies', postal: ['7350'], lat: 50.4333, lng: 3.6833, pop: 6800, hub: false, fh: 25, transit: ['A7'] },
  { nis: '53046', name: 'Honnelles', nl: 'Honnelles', postal: ['7387'], lat: 50.3500, lng: 3.7167, pop: 5200, hub: false, fh: 25, transit: ['N560'] },
  { nis: '53047', name: 'Jurbise', nl: 'Jurbeke', postal: ['7050'], lat: 50.5333, lng: 3.9167, pop: 10800, hub: false, fh: 25, transit: ['N56'] },
  { nis: '53048', name: 'Lens', nl: 'Lens', postal: ['7870'], lat: 50.5500, lng: 3.9000, pop: 4600, hub: false, fh: 25, transit: ['N56'] },
  { nis: '53084', name: 'Quévy', nl: 'Quévy', postal: ['7040','7041'], lat: 50.3667, lng: 3.9500, pop: 8100, hub: false, fh: 24, transit: ['N6'] },
  { nis: '56001', name: 'Anderlues', nl: 'Anderlues', postal: ['6150'], lat: 50.4000, lng: 4.2667, pop: 12400, hub: false, fh: 23, transit: ['N90'] },
  { nis: '56005', name: 'Beaumont', nl: 'Beaumont', postal: ['6500','6511'], lat: 50.2333, lng: 4.2333, pop: 7200, hub: false, fh: 23, transit: ['N53'] },
  { nis: '56022', name: 'Chimay', nl: 'Chimay', postal: ['6460','6461','6462','6463','6464'], lat: 50.0500, lng: 4.3167, pop: 9800, hub: true, fh: 20, transit: ['N53','N99'] },
  { nis: '56029', name: 'Erquelinnes', nl: 'Erquelinnes', postal: ['6560'], lat: 50.3000, lng: 4.1167, pop: 10000, hub: false, fh: 24, transit: ['N54'] },
  { nis: '56044', name: 'Froidchapelle', nl: 'Froidchapelle', postal: ['6470'], lat: 50.1500, lng: 4.3333, pop: 4000, hub: false, fh: 21, transit: ['N589'] },
  { nis: '56049', name: 'Lobbes', nl: 'Lobbes', postal: ['6540'], lat: 50.3500, lng: 4.2667, pop: 5900, hub: false, fh: 23, transit: ['N54'] },
  { nis: '56051', name: 'Merbes-le-Château', nl: 'Merbes-le-Château', postal: ['6567'], lat: 50.3167, lng: 4.1667, pop: 4300, hub: false, fh: 24, transit: ['N54'] },
  { nis: '56056', name: 'Momignies', nl: 'Momignies', postal: ['6590','6591','6592','6593','6594','6596'], lat: 50.0333, lng: 4.1667, pop: 5300, hub: false, fh: 20, transit: ['N99'] },
  { nis: '56078', name: 'Sivry-Rance', nl: 'Sivry-Rance', postal: ['6470'], lat: 50.1667, lng: 4.1833, pop: 4800, hub: false, fh: 21, transit: ['N53'] },
  { nis: '56086', name: 'Thuin', nl: 'Thuin', postal: ['6530','6531','6532','6533','6534','6536'], lat: 50.3333, lng: 4.2833, pop: 14700, hub: true, fh: 23, transit: ['N53','N59'] },
  { nis: '56041', name: 'Enghien', nl: 'Edingen', postal: ['7850'], lat: 50.6933, lng: 4.0378, pop: 14200, hub: false, fh: 26, transit: ['A8','N7'] },
  { nis: '56077', name: 'Silly', nl: 'Opzullik', postal: ['7830'], lat: 50.6500, lng: 3.9167, pop: 8400, hub: false, fh: 25, transit: ['N7','A8'] },
  { nis: '56047', name: 'Lessines', nl: 'Lessen', postal: ['7860','7861','7862','7863','7864','7866'], lat: 50.7167, lng: 3.8333, pop: 18700, hub: false, fh: 26, transit: ['A8','N57'] },
  { nis: '51008', name: 'Belœil', nl: 'Belœil', postal: ['7970','7971','7972','7973'], lat: 50.5500, lng: 3.7333, pop: 14100, hub: false, fh: 25, transit: ['N526'] },
  { nis: '56012', name: 'Bernissart', nl: 'Bernissart', postal: ['7320','7321','7322'], lat: 50.4833, lng: 3.6500, pop: 11900, hub: false, fh: 25, transit: ['N505'] },
  { nis: '56013', name: 'Brugelette', nl: 'Brugelette', postal: ['7940','7941','7942','7943'], lat: 50.5833, lng: 3.8500, pop: 3700, hub: false, fh: 25, transit: ['N56'] },
  { nis: '56014', name: 'Chièvres', nl: 'Chièvres', postal: ['7950','7951'], lat: 50.5833, lng: 3.8000, pop: 7000, hub: false, fh: 25, transit: ['N56'] },
  { nis: '56015', name: 'Ellezelles', nl: 'Elzele', postal: ['7890'], lat: 50.7333, lng: 3.6833, pop: 6000, hub: false, fh: 25, transit: ['N57'] },
  { nis: '51019', name: 'Flobecq', nl: 'Vloesberg', postal: ['7880'], lat: 50.7333, lng: 3.7333, pop: 3400, hub: false, fh: 25, transit: ['N57'] },
  { nis: '56017', name: 'Frasnes-lez-Anvaing', nl: 'Frasnes-lez-Anvaing', postal: ['7910','7911','7912'], lat: 50.6667, lng: 3.6167, pop: 11800, hub: false, fh: 25, transit: ['A8','N60'] },
  { nis: '56018', name: 'Mont-de-l’Enclus', nl: 'Mont-de-l’Enclus', postal: ['7750'], lat: 50.7500, lng: 3.5000, pop: 3800, hub: false, fh: 26, transit: ['N36'] },
  { nis: '57003', name: 'Antoing', nl: 'Antoing', postal: ['7640','7641','7642','7643'], lat: 50.5667, lng: 3.4500, pop: 7800, hub: false, fh: 26, transit: ['N502'] },
  { nis: '57008', name: 'Celles', nl: 'Celles', postal: ['7760'], lat: 50.7167, lng: 3.4500, pop: 5700, hub: false, fh: 26, transit: ['A8'] },
  { nis: '57018', name: 'Estaimpuis', nl: 'Steenput', postal: ['7730'], lat: 50.7000, lng: 3.2667, pop: 10500, hub: false, fh: 27, transit: ['E403'] },
  { nis: '57062', name: 'Pecq', nl: 'Pecq', postal: ['7740'], lat: 50.6833, lng: 3.3333, pop: 5800, hub: false, fh: 26, transit: ['N50'] },
  { nis: '57064', name: 'Péruwelz', nl: 'Péruwelz', postal: ['7600','7601','7602','7603','7604'], lat: 50.5167, lng: 3.5833, pop: 17200, hub: false, fh: 25, transit: ['A16','N60'] },
  { nis: '57072', name: 'Rumes', nl: 'Rumes', postal: ['7610','7611','7618'], lat: 50.5500, lng: 3.3000, pop: 5300, hub: false, fh: 26, transit: ['N508'] },
  { nis: '57088', name: 'Comines-Warneton', nl: 'Komen-Waasten', postal: ['7780','7781','7782','7783','7784'], lat: 50.7667, lng: 3.0000, pop: 18100, hub: false, fh: 27, transit: ['N58'] },
  { nis: '57094', name: 'Brunehaut', nl: 'Brunehaut', postal: ['7620','7621','7622','7623','7624'], lat: 50.5167, lng: 3.4167, pop: 8100, hub: false, fh: 26, transit: ['N507'] },
  { nis: '57096', name: 'Leuze-en-Hainaut', nl: 'Leuze-en-Hainaut', postal: ['7900','7901','7903','7904','7906'], lat: 50.6000, lng: 3.6167, pop: 13900, hub: false, fh: 26, transit: ['A8','N7'] },
  { nis: '57097', name: 'Sillegnies', nl: 'Sillegnies', postal: ['7061'], lat: 50.5667, lng: 3.9667, pop: 2200, hub: false, fh: 25, transit: ['N56'] },
  { nis: '56087', name: 'Morlanwelz', nl: 'Morlanwelz', postal: ['7140','7141'], lat: 50.4500, lng: 4.2333, pop: 19100, hub: false, fh: 23, transit: ['N59'] },
];

// ==========================================
// 4. LIÈGE (All 81 Communes deduped)
// ==========================================
const LIEGE_81 = [
  { nis: '62063', name: 'Liège', nl: 'Luik', postal: ['4000','4020','4030','4031','4032'], lat: 50.6326, lng: 5.5797, pop: 195278, hub: true, fh: 18, transit: ['E25','E40','E42'] },
  { nis: '62096', name: 'Seraing', nl: 'Seraing', postal: ['4100','4101','4102'], lat: 50.5833, lng: 5.5000, pop: 64157, hub: true, fh: 18, transit: ['E42','N90'] },
  { nis: '63079', name: 'Verviers', nl: 'Verviers', postal: ['4800','4801','4802'], lat: 50.5833, lng: 5.8667, pop: 55198, hub: true, fh: 16, transit: ['E42','N61'] },
  { nis: '62051', name: 'Herstal', nl: 'Herstal', postal: ['4040','4041','4042'], lat: 50.6667, lng: 5.6333, pop: 40167, hub: false, fh: 18, transit: ['E25','E40'] },
  { nis: '62003', name: 'Ans', nl: 'Ans', postal: ['4430','4431','4432'], lat: 50.6667, lng: 5.5167, pop: 28400, hub: false, fh: 18, transit: ['E40','A602'] },
  { nis: '62120', name: 'Flémalle', nl: 'Flémalle', postal: ['4400'], lat: 50.6000, lng: 5.4667, pop: 26300, hub: false, fh: 18, transit: ['E42','N90'] },
  { nis: '62118', name: 'Grâce-Hollogne', nl: 'Grâce-Hollogne', postal: ['4460'], lat: 50.6333, lng: 5.5000, pop: 22600, hub: false, fh: 18, transit: ['E42','A604'] },
  { nis: '62093', name: 'Saint-Nicolas', nl: 'Saint-Nicolas', postal: ['4420'], lat: 50.6333, lng: 5.5333, pop: 24300, hub: false, fh: 18, transit: ['A602'] },
  { nis: '62022', name: 'Chaudfontaine', nl: 'Chaudfontaine', postal: ['4050','4051','4052','4053'], lat: 50.5833, lng: 5.6500, pop: 20900, hub: false, fh: 17, transit: ['E25','N30'] },
  { nis: '62079', name: 'Oupeye', nl: 'Oupeye', postal: ['4680','4681','4682','4683','4684'], lat: 50.7000, lng: 5.6500, pop: 25400, hub: false, fh: 18, transit: ['E25'] },
  { nis: '62108', name: 'Visé', nl: 'Wezet', postal: ['4600','4601','4602'], lat: 50.7333, lng: 5.6833, pop: 17800, hub: true, fh: 18, transit: ['E25'] },
  { nis: '61031', name: 'Huy', nl: 'Hoei', postal: ['4500'], lat: 50.5167, lng: 5.2333, pop: 21300, hub: true, fh: 19, transit: ['N90','E42'] },
  { nis: '64074', name: 'Waremme', nl: 'Borgworm', postal: ['4300'], lat: 50.7000, lng: 5.2500, pop: 15300, hub: true, fh: 20, transit: ['E40'] },
  { nis: '63023', name: 'Eupen', nl: 'Eupen', postal: ['4700','4701'], lat: 50.6333, lng: 6.0333, pop: 19500, hub: true, fh: 14, transit: ['E40','N67'] },
  { nis: '63045', name: 'Malmedy', nl: 'Malmedy', postal: ['4960'], lat: 50.4167, lng: 6.0333, pop: 12700, hub: true, fh: 12, transit: ['E42','N68'] },
  { nis: '63072', name: 'Spa', nl: 'Spa', postal: ['4900'], lat: 50.4833, lng: 5.8667, pop: 10400, hub: true, fh: 10, transit: ['E42','N62'] },
  { nis: '62011', name: 'Beyne-Heusay', nl: 'Beyne-Heusay', postal: ['4610'], lat: 50.6167, lng: 5.6500, pop: 12000, hub: false, fh: 18, transit: ['N3'] },
  { nis: '62027', name: 'Comblain-au-Pont', nl: 'Comblain-au-Pont', postal: ['4170','4171'], lat: 50.4833, lng: 5.5833, pop: 5400, hub: false, fh: 16, transit: ['N633'] },
  { nis: '62032', name: 'Esneux', nl: 'Esneux', postal: ['4130'], lat: 50.5333, lng: 5.5667, pop: 13000, hub: false, fh: 17, transit: ['N633'] },
  { nis: '62038', name: 'Fléron', nl: 'Fléron', postal: ['4620','4621','4623','4624'], lat: 50.6167, lng: 5.6833, pop: 16500, hub: false, fh: 18, transit: ['N3'] },
  { nis: '62099', name: 'Soumagne', nl: 'Soumagne', postal: ['4630','4631','4632','4633'], lat: 50.6167, lng: 5.7500, pop: 17000, hub: false, fh: 17, transit: ['E40'] },
  { nis: '62100', name: 'Sprimont', nl: 'Sprimont', postal: ['4140','4141'], lat: 50.5000, lng: 5.6667, pop: 14700, hub: false, fh: 16, transit: ['E25'] },
  { nis: '62006', name: 'Awans', nl: 'Awans', postal: ['4340','4342'], lat: 50.6667, lng: 5.4667, pop: 9300, hub: false, fh: 19, transit: ['E40'] },
  { nis: '62009', name: 'Bassenge', nl: 'Bitsingen', postal: ['4690'], lat: 50.7500, lng: 5.6167, pop: 9000, hub: false, fh: 19, transit: ['N618'] },
  { nis: '62015', name: 'Blegny', nl: 'Blegny', postal: ['4670','4671','4672'], lat: 50.6667, lng: 5.7167, pop: 13300, hub: false, fh: 18, transit: ['E40'] },
  { nis: '62024', name: 'Crisnée', nl: 'Crisnée', postal: ['4367'], lat: 50.7167, lng: 5.4000, pop: 3400, hub: false, fh: 20, transit: ['E40'] },
  { nis: '62026', name: 'Dalhem', nl: 'Dalhem', postal: ['4607','4608'], lat: 50.7167, lng: 5.7167, pop: 7500, hub: false, fh: 18, transit: ['N608'] },
  { nis: '61028', name: 'Engis', nl: 'Engis', postal: ['4480'], lat: 50.5833, lng: 5.4000, pop: 6100, hub: false, fh: 19, transit: ['N90'] },
  { nis: '62060', name: 'Juprelle', nl: 'Juprelle', postal: ['4450','4451','4452','4453','4458'], lat: 50.7000, lng: 5.5333, pop: 9400, hub: false, fh: 19, transit: ['N20'] },
  { nis: '62075', name: 'Neupré', nl: 'Neupré', postal: ['4120','4121','4122'], lat: 50.5333, lng: 5.4667, pop: 10000, hub: false, fh: 17, transit: ['N63'] },
  { nis: '62092', name: 'Saint-Georges-sur-Meuse', nl: 'Saint-Georges-sur-Meuse', postal: ['4470'], lat: 50.6000, lng: 5.3667, pop: 6900, hub: false, fh: 19, transit: ['E42'] },
  { nis: '62106', name: 'Verlaine', nl: 'Verlaine', postal: ['4537'], lat: 50.6000, lng: 5.3167, pop: 4200, hub: false, fh: 19, transit: ['E42'] },
  { nis: '63001', name: 'Amel', nl: 'Ambleve', postal: ['4770','4771'], lat: 50.3500, lng: 6.1667, pop: 5500, hub: false, fh: 12, transit: ['N658'] },
  { nis: '63004', name: 'Aubel', nl: 'Aubel', postal: ['4880'], lat: 50.7000, lng: 5.8667, pop: 4300, hub: false, fh: 16, transit: ['N642'] },
  { nis: '63012', name: 'Baelen', nl: 'Baelen', postal: ['4837'], lat: 50.6333, lng: 5.9667, pop: 4400, hub: false, fh: 15, transit: ['E40'] },
  { nis: '63013', name: 'Büllingen', nl: 'Bullange', postal: ['4760','4761'], lat: 50.4000, lng: 6.2500, pop: 5500, hub: false, fh: 12, transit: ['N658'] },
  { nis: '63014', name: 'Burg-Reuland', nl: 'Burg-Reuland', postal: ['4790','4791'], lat: 50.2000, lng: 6.1333, pop: 4000, hub: false, fh: 12, transit: ['N62'] },
  { nis: '63017', name: 'Butgenbach', nl: 'Butgenbach', postal: ['4750'], lat: 50.4333, lng: 6.2000, pop: 5600, hub: false, fh: 12, transit: ['N658'] },
  { nis: '63020', name: 'Dison', nl: 'Dison', postal: ['4820','4821'], lat: 50.6000, lng: 5.8500, pop: 15300, hub: false, fh: 16, transit: ['E42'] },
  { nis: '63035', name: 'Herve', nl: 'Herve', postal: ['4650','4651','4652','4653','4654'], lat: 50.6333, lng: 5.8000, pop: 17600, hub: false, fh: 17, transit: ['E40'] },
  { nis: '63038', name: 'Jalhay', nl: 'Jalhay', postal: ['4845'], lat: 50.5500, lng: 5.9667, pop: 8600, hub: false, fh: 14, transit: ['N629'] },
  { nis: '63040', name: 'Kelmis', nl: 'La Calamine', postal: ['4720','4721','4728'], lat: 50.7167, lng: 6.0000, pop: 11200, hub: false, fh: 15, transit: ['N3'] },
  { nis: '63046', name: 'Lierneux', nl: 'Lierneux', postal: ['4990'], lat: 50.2833, lng: 5.7833, pop: 3600, hub: false, fh: 12, transit: ['N645'] },
  { nis: '63048', name: 'Limbourg', nl: 'Limburg', postal: ['4830','4831'], lat: 50.6167, lng: 5.9333, pop: 5900, hub: false, fh: 15, transit: ['N61'] },
  { nis: '63049', name: 'Lontzen', nl: 'Lontzen', postal: ['4710','4711'], lat: 50.6833, lng: 6.0000, pop: 5800, hub: false, fh: 15, transit: ['E40'] },
  { nis: '63057', name: 'Olne', nl: 'Olne', postal: ['4877'], lat: 50.5833, lng: 5.7500, pop: 4100, hub: false, fh: 16, transit: ['N61'] },
  { nis: '63058', name: 'Pepinster', nl: 'Pepinster', postal: ['4860','4861'], lat: 50.5667, lng: 5.8000, pop: 9700, hub: false, fh: 16, transit: ['N61'] },
  { nis: '63061', name: 'Plombières', nl: 'Blieberg', postal: ['4850','4851','4852'], lat: 50.7333, lng: 5.9667, pop: 10400, hub: false, fh: 16, transit: ['N3'] },
  { nis: '63067', name: 'Raeren', nl: 'Raeren', postal: ['4730','4731'], lat: 50.6667, lng: 6.1167, pop: 10800, hub: false, fh: 14, transit: ['E40'] },
  { nis: '63073', name: 'Stavelot', nl: 'Stavelot', postal: ['4970'], lat: 50.3833, lng: 5.9333, pop: 7200, hub: false, fh: 12, transit: ['N68'] },
  { nis: '63075', name: 'Stoumont', nl: 'Stoumont', postal: ['4987'], lat: 50.4000, lng: 5.8000, pop: 3200, hub: false, fh: 12, transit: ['N33'] },
  { nis: '63076', name: 'Theux', nl: 'Theux', postal: ['4910'], lat: 50.5333, lng: 5.8167, pop: 12000, hub: false, fh: 15, transit: ['E42'] },
  { nis: '63077', name: 'Thimister-Clermont', nl: 'Thimister-Clermont', postal: ['4890'], lat: 50.6500, lng: 5.8667, pop: 5700, hub: false, fh: 16, transit: ['N3'] },
  { nis: '63080', name: 'Trois-Ponts', nl: 'Trois-Ponts', postal: ['4980','4983'], lat: 50.3667, lng: 5.8667, pop: 2500, hub: false, fh: 12, transit: ['N68'] },
  { nis: '63084', name: 'Waimes', nl: 'Weismes', postal: ['4950'], lat: 50.4167, lng: 6.1167, pop: 7400, hub: false, fh: 12, transit: ['N68'] },
  { nis: '63086', name: 'Welkenraedt', nl: 'Welkenraedt', postal: ['4840','4841'], lat: 50.6667, lng: 5.9667, pop: 10000, hub: false, fh: 15, transit: ['E40'] },
  { nis: '61003', name: 'Amay', nl: 'Amay', postal: ['4540'], lat: 50.5500, lng: 5.3167, pop: 14400, hub: false, fh: 19, transit: ['N90'] },
  { nis: '61007', name: 'Anis-sur-Meuse', nl: 'Anis-sur-Meuse', postal: ['4550'], lat: 50.5333, lng: 5.3500, pop: 4800, hub: false, fh: 19, transit: ['N90'] },
  { nis: '61010', name: 'Berloz', nl: 'Berloz', postal: ['4257'], lat: 50.7000, lng: 5.2000, pop: 3200, hub: false, fh: 20, transit: ['E40'] },
  { nis: '61012', name: 'Braives', nl: 'Braives', postal: ['4260','4261','4263'], lat: 50.6167, lng: 5.1500, pop: 6400, hub: false, fh: 20, transit: ['N65'] },
  { nis: '61019', name: 'Burdinne', nl: 'Burdinne', postal: ['4210'], lat: 50.5833, lng: 5.0667, pop: 3200, hub: false, fh: 20, transit: ['N64'] },
  { nis: '61024', name: 'Clavier', nl: 'Clavier', postal: ['4560'], lat: 50.4167, lng: 5.3667, pop: 4600, hub: false, fh: 18, transit: ['N63'] },
  { nis: '61039', name: 'Faimes', nl: 'Faimes', postal: ['4317'], lat: 50.6667, lng: 5.2667, pop: 3900, hub: false, fh: 20, transit: ['N65'] },
  { nis: '61041', name: 'Ferrières', nl: 'Ferrières', postal: ['4190'], lat: 50.4000, lng: 5.6000, pop: 5000, hub: false, fh: 16, transit: ['N66'] },
  { nis: '61043', name: 'Fexhe-le-Haut-Clocher', nl: 'Fexhe-le-Haut-Clocher', postal: ['4347'], lat: 50.6667, lng: 5.4000, pop: 3300, hub: false, fh: 20, transit: ['E40'] },
  { nis: '61045', name: 'Geer', nl: 'Geer', postal: ['4250','4252','4254'], lat: 50.6667, lng: 5.1667, pop: 3400, hub: false, fh: 20, transit: ['N69'] },
  { nis: '61048', name: 'Hamoir', nl: 'Hamoir', postal: ['4180','4181'], lat: 50.4333, lng: 5.5333, pop: 3800, hub: false, fh: 16, transit: ['N633'] },
  { nis: '61050', name: 'Héron', nl: 'Héron', postal: ['4217','4218'], lat: 50.5500, lng: 5.1000, pop: 5400, hub: false, fh: 20, transit: ['E42'] },
  { nis: '61058', name: 'Lincent', nl: 'Lijsem', postal: ['4287'], lat: 50.7167, lng: 5.0333, pop: 3300, hub: false, fh: 21, transit: ['E40'] },
  { nis: '61060', name: 'Marchin', nl: 'Marchin', postal: ['4570'], lat: 50.4667, lng: 5.2333, pop: 5500, hub: false, fh: 19, transit: ['N641'] },
  { nis: '61063', name: 'Modave', nl: 'Modave', postal: ['4577'], lat: 50.4500, lng: 5.3000, pop: 4200, hub: false, fh: 18, transit: ['N641'] },
  { nis: '61068', name: 'Nandrin', nl: 'Nandrin', postal: ['4550'], lat: 50.5000, lng: 5.4167, pop: 5800, hub: false, fh: 18, transit: ['N63'] },
  { nis: '61070', name: 'Tinlot', nl: 'Tinlot', postal: ['4557'], lat: 50.4833, lng: 5.3833, pop: 2700, hub: false, fh: 18, transit: ['N63'] },
  { nis: '61073', name: 'Villers-le-Bouillet', nl: 'Villers-le-Bouillet', postal: ['4530'], lat: 50.5833, lng: 5.2667, pop: 6500, hub: false, fh: 19, transit: ['E42'] },
  { nis: '61079', name: 'Wanze', nl: 'Wanze', postal: ['4520'], lat: 50.5333, lng: 5.2167, pop: 13800, hub: false, fh: 19, transit: ['N90','E42'] },
  { nis: '64023', name: 'Hannut', nl: 'Hannuit', postal: ['4280'], lat: 50.6667, lng: 5.0833, pop: 16500, hub: true, fh: 21, transit: ['E40','N64'] },
  { nis: '64025', name: 'Donceel', nl: 'Donceel', postal: ['4357'], lat: 50.6500, lng: 5.3167, pop: 3100, hub: false, fh: 20, transit: ['E40'] },
  { nis: '64034', name: 'Oreye', nl: 'Oerle', postal: ['4360'], lat: 50.7333, lng: 5.3500, pop: 4000, hub: false, fh: 20, transit: ['N3'] },
  { nis: '64047', name: 'Remicourt', nl: 'Remicourt', postal: ['4350'], lat: 50.6833, lng: 5.3333, pop: 5900, hub: false, fh: 20, transit: ['E40'] },
  { nis: '64056', name: 'Saint-Georges', nl: 'Saint-Georges', postal: ['4470'], lat: 50.6000, lng: 5.3500, pop: 6700, hub: false, fh: 19, transit: ['E42'] },
];

// ==========================================
// 5. NAMUR (All 38 Communes)
// ==========================================
const NAMUR_38 = [
  { nis: '92094', name: 'Namur', nl: 'Namen', postal: ['5000','5001','5002','5004','5020','5021','5022','5024','5100','5101'], lat: 50.4669, lng: 4.8675, pop: 112559, hub: true, fh: 23, transit: ['E411','E42','N4','N90'] },
  { nis: '92142', name: 'Gembloux', nl: 'Gembloers', postal: ['5030','5031','5032'], lat: 50.5667, lng: 4.7000, pop: 26000, hub: true, fh: 25, transit: ['N4','N29'] },
  { nis: '92120', name: 'Sambreville', nl: 'Sambreville', postal: ['5060'], lat: 50.4333, lng: 4.6000, pop: 28300, hub: true, fh: 24, transit: ['N90','N98'] },
  { nis: '92003', name: 'Andenne', nl: 'Andenne', postal: ['5300'], lat: 50.4833, lng: 5.1000, pop: 27500, hub: true, fh: 21, transit: ['E42','N90'] },
  { nis: '91034', name: 'Ciney', nl: 'Ciney', postal: ['5590'], lat: 50.2833, lng: 5.1000, pop: 16800, hub: true, fh: 20, transit: ['N4','E411'] },
  { nis: '91054', name: 'Dinant', nl: 'Dinant', postal: ['5500'], lat: 50.2667, lng: 4.9167, pop: 13500, hub: true, fh: 21, transit: ['N97','N92'] },
  { nis: '91005', name: 'Beauraing', nl: 'Beauraing', postal: ['5570'], lat: 50.1167, lng: 4.9500, pop: 9100, hub: false, fh: 19, transit: ['N95'] },
  { nis: '91030', name: 'Cerfontaine', nl: 'Cerfontaine', postal: ['5630'], lat: 50.1667, lng: 4.4167, pop: 5000, hub: false, fh: 20, transit: ['N97'] },
  { nis: '91040', name: 'Couvin', nl: 'Couvin', postal: ['5660'], lat: 50.0500, lng: 4.5000, pop: 13800, hub: true, fh: 18, transit: ['E420','N5'] },
  { nis: '91048', name: 'Doische', nl: 'Doische', postal: ['5680'], lat: 50.1333, lng: 4.7500, pop: 3000, hub: false, fh: 19, transit: ['N99'] },
  { nis: '91059', name: 'Florennes', nl: 'Florennes', postal: ['5620'], lat: 50.2500, lng: 4.6000, pop: 11300, hub: false, fh: 21, transit: ['N97'] },
  { nis: '91064', name: 'Hastière', nl: 'Hastière', postal: ['5540','5541'], lat: 50.2167, lng: 4.8167, pop: 6000, hub: false, fh: 20, transit: ['N96'] },
  { nis: '91072', name: 'Houyet', nl: 'Houyet', postal: ['5560'], lat: 50.1833, lng: 5.0167, pop: 5100, hub: false, fh: 19, transit: ['N94'] },
  { nis: '91103', name: 'Onhaye', nl: 'Onhaye', postal: ['5520'], lat: 50.2333, lng: 4.8333, pop: 3200, hub: false, fh: 20, transit: ['N97'] },
  { nis: '91114', name: 'Philippeville', nl: 'Philippeville', postal: ['5600'], lat: 50.2000, lng: 4.5333, pop: 9300, hub: true, fh: 21, transit: ['N5','N97'] },
  { nis: '91120', name: 'Rochefort', nl: 'Rochefort', postal: ['5580'], lat: 50.1667, lng: 5.2167, pop: 12600, hub: true, fh: 18, transit: ['N86'] },
  { nis: '91141', name: 'Viroinval', nl: 'Viroinval', postal: ['5670'], lat: 50.0500, lng: 4.6500, pop: 5700, hub: false, fh: 18, transit: ['N99'] },
  { nis: '91142', name: 'Walcourt', nl: 'Walcourt', postal: ['5650','5651'], lat: 50.2500, lng: 4.4333, pop: 18400, hub: false, fh: 21, transit: ['N5'] },
  { nis: '91143', name: 'Yvoir', nl: 'Yvoir', postal: ['5530'], lat: 50.3333, lng: 4.8833, pop: 9100, hub: false, fh: 21, transit: ['N92'] },
  { nis: '92006', name: 'Assesse', nl: 'Assesse', postal: ['5330'], lat: 50.3667, lng: 5.0167, pop: 7000, hub: false, fh: 21, transit: ['N4','E411'] },
  { nis: '92045', name: 'Éghezée', nl: 'Éghezée', postal: ['5310'], lat: 50.5833, lng: 4.9000, pop: 16500, hub: false, fh: 24, transit: ['E411','N91'] },
  { nis: '92048', name: 'Fernelmont', nl: 'Fernelmont', postal: ['5380'], lat: 50.5500, lng: 4.9833, pop: 8100, hub: false, fh: 23, transit: ['E42'] },
  { nis: '92054', name: 'Floreffe', nl: 'Floreffe', postal: ['5150'], lat: 50.4333, lng: 4.7500, pop: 8100, hub: false, fh: 23, transit: ['N90'] },
  { nis: '92055', name: 'Fosses-la-Ville', nl: 'Fosses-la-Ville', postal: ['5070'], lat: 50.4000, lng: 4.7000, pop: 10400, hub: false, fh: 23, transit: ['N98'] },
  { nis: '92064', name: 'Gesves', nl: 'Gesves', postal: ['5340'], lat: 50.4000, lng: 5.0667, pop: 7400, hub: false, fh: 21, transit: ['N942'] },
  { nis: '92076', name: 'Hamois', nl: 'Hamois', postal: ['5360','5361','5362'], lat: 50.3333, lng: 5.1667, pop: 7300, hub: false, fh: 20, transit: ['N4'] },
  { nis: '92087', name: 'Havelange', nl: 'Havelange', postal: ['5370','5374','5376'], lat: 50.3833, lng: 5.2500, pop: 5200, hub: false, fh: 20, transit: ['N63'] },
  { nis: '92097', name: 'Jemeppe-sur-Sambre', nl: 'Jemeppe-sur-Sambre', postal: ['5190'], lat: 50.4667, lng: 4.6667, pop: 19100, hub: false, fh: 24, transit: ['N90'] },
  { nis: '92101', name: 'La Bruyère', nl: 'La Bruyère', postal: ['5080','5081'], lat: 50.5167, lng: 4.8000, pop: 9300, hub: false, fh: 24, transit: ['E411','N4'] },
  { nis: '92106', name: 'Mettet', nl: 'Mettet', postal: ['5640'], lat: 50.3167, lng: 4.6500, pop: 13300, hub: false, fh: 22, transit: ['N98'] },
  { nis: '92114', name: 'Ohey', nl: 'Ohey', postal: ['5350','5351','5352'], lat: 50.4333, lng: 5.1167, pop: 5100, hub: false, fh: 21, transit: ['N942'] },
  { nis: '92118', name: 'Profondeville', nl: 'Profondeville', postal: ['5170'], lat: 50.3833, lng: 4.8667, pop: 12200, hub: false, fh: 22, transit: ['N92'] },
  { nis: '92124', name: 'Sombreffe', nl: 'Sombreffe', postal: ['5140'], lat: 50.5333, lng: 4.6000, pop: 8400, hub: false, fh: 24, transit: ['N29'] },
  { nis: '92137', name: 'Somme-Leuze', nl: 'Somme-Leuze', postal: ['5377'], lat: 50.3333, lng: 5.3667, pop: 5600, hub: false, fh: 19, transit: ['N63'] },
  { nis: '92138', name: 'Anhée', nl: 'Anhée', postal: ['5537'], lat: 50.3167, lng: 4.8833, pop: 7100, hub: false, fh: 21, transit: ['N92'] },
  { nis: '92140', name: 'Vresse-sur-Semois', nl: 'Vresse-sur-Semois', postal: ['5550'], lat: 49.8667, lng: 4.9333, pop: 2600, hub: false, fh: 15, transit: ['N945'] },
  { nis: '92141', name: 'Bievre', nl: 'Bièvre', postal: ['5555'], lat: 49.9333, lng: 5.0167, pop: 3300, hub: false, fh: 16, transit: ['N95'] },
  { nis: '91053', name: 'Gedinne', nl: 'Gedinne', postal: ['5575'], lat: 50.0000, lng: 4.9333, pop: 4600, hub: false, fh: 16, transit: ['N95'] },
];

// ==========================================
// 6. LUXEMBOURG (All 44 Communes)
// ==========================================
const LUXEMBOURG_44 = [
  { nis: '81001', name: 'Arlon', nl: 'Aarlen', postal: ['6700','6706'], lat: 49.6831, lng: 5.8163, pop: 30299, hub: true, fh: 28, transit: ['E411','E25','N4'] },
  { nis: '84009', name: 'Bastogne', nl: 'Bastenaken', postal: ['6600'], lat: 50.0000, lng: 5.7167, pop: 16200, hub: true, fh: 12, transit: ['E25','N4'] },
  { nis: '83040', name: 'Marche-en-Famenne', nl: 'Marche-en-Famenne', postal: ['6900'], lat: 50.2333, lng: 5.3500, pop: 17500, hub: true, fh: 18, transit: ['N4','N63'] },
  { nis: '85007', name: 'Neufchâteau', nl: 'Neufchâteau', postal: ['6840'], lat: 49.8333, lng: 5.4333, pop: 7800, hub: true, fh: 13, transit: ['E411','E25'] },
  { nis: '85045', name: 'Virton', nl: 'Virton', postal: ['6760','6761','6762'], lat: 49.5667, lng: 5.5333, pop: 11300, hub: true, fh: 26, transit: ['N87','N88'] },
  { nis: '82005', name: 'Bouillon', nl: 'Bouillon', postal: ['6830','6831','6832','6833','6834','6836','6838'], lat: 49.7833, lng: 5.0667, pop: 5400, hub: false, fh: 14, transit: ['N89'] },
  { nis: '82014', name: 'Florenville', nl: 'Florenville', postal: ['6820','6821','6823','6824'], lat: 49.7000, lng: 5.3167, pop: 5600, hub: false, fh: 20, transit: ['N83'] },
  { nis: '83012', name: 'Durbuy', nl: 'Durbuy', postal: ['6940','6941'], lat: 50.3500, lng: 5.4500, pop: 11400, hub: false, fh: 17, transit: ['N833'] },
  { nis: '84033', name: 'Houffalize', nl: 'Houffalize', postal: ['6660','6661','6662','6663'], lat: 50.1333, lng: 5.7833, pop: 5200, hub: false, fh: 11, transit: ['E25'] },
  { nis: '83055', name: 'La Roche-en-Ardenne', nl: 'La Roche-en-Ardenne', postal: ['6980','6982','6983','6984','6986'], lat: 50.1833, lng: 5.5833, pop: 4200, hub: false, fh: 12, transit: ['N89'] },
  { nis: '85026', name: 'Libramont-Chevigny', nl: 'Libramont-Chevigny', postal: ['6800'], lat: 49.9167, lng: 5.3833, pop: 11300, hub: true, fh: 13, transit: ['E411','N89'] },
  { nis: '81003', name: 'Attert', nl: 'Attert', postal: ['6717'], lat: 49.7500, lng: 5.7833, pop: 5600, hub: false, fh: 26, transit: ['N4'] },
  { nis: '81004', name: 'Aubange', nl: 'Aubange', postal: ['6790','6791','6792'], lat: 49.5667, lng: 5.8000, pop: 17100, hub: false, fh: 28, transit: ['E411','N88'] },
  { nis: '81013', name: 'Martelange', nl: 'Martelange', postal: ['6630'], lat: 49.8333, lng: 5.7333, pop: 1900, hub: false, fh: 15, transit: ['N4'] },
  { nis: '81015', name: 'Messancy', nl: 'Messancy', postal: ['6780','6781','6782'], lat: 49.6000, lng: 5.8167, pop: 8300, hub: false, fh: 28, transit: ['E411','N81'] },
  { nis: '82003', name: 'Bertrix', nl: 'Bertrix', postal: ['6880'], lat: 49.8500, lng: 5.2500, pop: 8800, hub: false, fh: 13, transit: ['N89'] },
  { nis: '82009', name: 'Daverdisse', nl: 'Daverdisse', postal: ['6929'], lat: 50.0167, lng: 5.1167, pop: 1400, hub: false, fh: 14, transit: ['N857'] },
  { nis: '82017', name: 'Herbeumont', nl: 'Herbeumont', postal: ['6887'], lat: 49.7833, lng: 5.2333, pop: 1600, hub: false, fh: 14, transit: ['N884'] },
  { nis: '82029', name: 'Léglise', nl: 'Léglise', postal: ['6860'], lat: 49.8000, lng: 5.5333, pop: 5600, hub: false, fh: 14, transit: ['E411'] },
  { nis: '82032', name: 'Libin', nl: 'Libin', postal: ['6890'], lat: 49.9833, lng: 5.2500, pop: 5200, hub: false, fh: 13, transit: ['E411'] },
  { nis: '82036', name: 'Paliseul', nl: 'Paliseul', postal: ['6850','6851','6852','6853','6856'], lat: 49.9000, lng: 5.1333, pop: 5400, hub: false, fh: 14, transit: ['N89'] },
  { nis: '82038', name: 'Saint-Hubert', nl: 'Saint-Hubert', postal: ['6870'], lat: 50.0167, lng: 5.3667, pop: 5600, hub: false, fh: 12, transit: ['N89'] },
  { nis: '82043', name: 'Tellin', nl: 'Tellin', postal: ['6927'], lat: 50.0833, lng: 5.2167, pop: 2500, hub: false, fh: 15, transit: ['E411'] },
  { nis: '82044', name: 'Wellin', nl: 'Wellin', postal: ['6920'], lat: 50.0833, lng: 5.1167, pop: 3100, hub: false, fh: 16, transit: ['E411','N40'] },
  { nis: '83013', name: 'Érezée', nl: 'Érezée', postal: ['6997'], lat: 50.3000, lng: 5.5500, pop: 3300, hub: false, fh: 14, transit: ['N807'] },
  { nis: '83028', name: 'Hotton', nl: 'Hotton', postal: ['6990'], lat: 50.2667, lng: 5.4500, pop: 5600, hub: false, fh: 17, transit: ['N86'] },
  { nis: '83034', name: 'Manhay', nl: 'Manhay', postal: ['6960'], lat: 50.3000, lng: 5.6667, pop: 3500, hub: false, fh: 12, transit: ['E25'] },
  { nis: '83044', name: 'Nassogne', nl: 'Nassogne', postal: ['6950','6951','6952','6953'], lat: 50.1333, lng: 5.2833, pop: 5500, hub: false, fh: 15, transit: ['N889'] },
  { nis: '83061', name: 'Rendeux', nl: 'Rendeux', postal: ['6987'], lat: 50.2333, lng: 5.5000, pop: 2600, hub: false, fh: 14, transit: ['N833'] },
  { nis: '83070', name: 'Tenneville', nl: 'Tenneville', postal: ['6970','6971','6972'], lat: 50.0833, lng: 5.5167, pop: 2800, hub: false, fh: 12, transit: ['N4'] },
  { nis: '84016', name: 'Fauvillers', nl: 'Fauvillers', postal: ['6637'], lat: 49.8500, lng: 5.6667, pop: 2300, hub: false, fh: 14, transit: ['N4'] },
  { nis: '84029', name: 'Gouvy', nl: 'Gouvy', postal: ['6670','6671','6672','6673','6674'], lat: 50.1833, lng: 5.9500, pop: 5300, hub: false, fh: 11, transit: ['N68'] },
  { nis: '84068', name: 'Sainte-Ode', nl: 'Sainte-Ode', postal: ['6680','6681'], lat: 50.0167, lng: 5.5167, pop: 2600, hub: false, fh: 12, transit: ['N4'] },
  { nis: '84075', name: 'Vaux-sur-Sûre', nl: 'Vaux-sur-Sûre', postal: ['6640','6642'], lat: 49.9167, lng: 5.5667, pop: 5700, hub: false, fh: 13, transit: ['E25'] },
  { nis: '84077', name: 'Vielsalm', nl: 'Vielsalm', postal: ['6690'], lat: 50.2833, lng: 5.9167, pop: 7800, hub: true, fh: 11, transit: ['N68'] },
  { nis: '85011', name: 'Chiny', nl: 'Chiny', postal: ['6810','6811','6812','6813'], lat: 49.7333, lng: 5.3333, pop: 5200, hub: false, fh: 18, transit: ['N83'] },
  { nis: '85016', name: 'Étalle', nl: 'Étalle', postal: ['6740','6741','6742','6743','6747'], lat: 49.6667, lng: 5.6000, pop: 5900, hub: false, fh: 24, transit: ['N83'] },
  { nis: '85024', name: 'Habay', nl: 'Habay', postal: ['6720','6721','6723','6724'], lat: 49.7333, lng: 5.6167, pop: 8500, hub: false, fh: 22, transit: ['E411','N87'] },
  { nis: '85034', name: 'Meix-devant-Virton', nl: 'Meix-devant-Virton', postal: ['6769'], lat: 49.6000, lng: 5.4833, pop: 2800, hub: false, fh: 26, transit: ['N88'] },
  { nis: '85039', name: 'Rouvroy', nl: 'Rouvroy', postal: ['6767'], lat: 49.5333, lng: 5.4833, pop: 2100, hub: false, fh: 27, transit: ['N87'] },
  { nis: '85046', name: 'Saint-Léger', nl: 'Saint-Léger', postal: ['6747'], lat: 49.6167, lng: 5.6500, pop: 3600, hub: false, fh: 26, transit: ['N82'] },
  { nis: '85047', name: 'Tintigny', nl: 'Tintigny', postal: ['6730'], lat: 49.6833, lng: 5.5167, pop: 4300, hub: false, fh: 24, transit: ['N83'] },
  { nis: '85049', name: 'Musson', nl: 'Musson', postal: ['6750'], lat: 49.5500, lng: 5.7000, pop: 4500, hub: false, fh: 28, transit: ['N88'] },
];

// ==========================================
// 7. BRABANT FLAMAND (35 Key Communes - Periphery & Core)
// ==========================================
const FLANDERS_35 = [
  { nis: '23094', name: 'Zaventem', nl: 'Zaventem', postal: ['1930','1931','1932','1933'], lat: 50.8833, lng: 4.4667, pop: 35000, hub: true, fh: 30, transit: ['R0','E40','A201'] },
  { nis: '23088', name: 'Vilvorde', nl: 'Vilvoorde', postal: ['1800'], lat: 50.9333, lng: 4.4167, pop: 45000, hub: true, fh: 31, transit: ['R0','E19'] },
  { nis: '23039', name: 'Kraainem', nl: 'Kraainem', postal: ['1950'], lat: 50.8667, lng: 4.4667, pop: 13700, hub: false, fh: 29, transit: ['R0','E40'] },
  { nis: '23102', name: 'Wezembeek-Oppem', nl: 'Wezembeek-Oppem', postal: ['1970'], lat: 50.8500, lng: 4.5000, pop: 14200, hub: false, fh: 29, transit: ['R0'] },
  { nis: '23023', name: 'Drogenbos', nl: 'Drogenbos', postal: ['1620'], lat: 50.7833, lng: 4.3167, pop: 5700, hub: false, fh: 29, transit: ['R0'] },
  { nis: '23044', name: 'Linkebeek', nl: 'Linkebeek', postal: ['1630'], lat: 50.7667, lng: 4.3333, pop: 4800, hub: false, fh: 28, transit: ['R0'] },
  { nis: '23101', name: 'Rhode-Saint-Genèse', nl: 'Sint-Genesius-Rode', postal: ['1640'], lat: 50.7444, lng: 4.3583, pop: 18500, hub: false, fh: 28, transit: ['N5','R0'] },
  { nis: '23103', name: 'Wemmel', nl: 'Wemmel', postal: ['1780'], lat: 50.9083, lng: 4.3000, pop: 16700, hub: false, fh: 30, transit: ['R0','A12'] },
  { nis: '23025', name: 'Grimbergen', nl: 'Grimbergen', postal: ['1850','1851','1852'], lat: 50.9333, lng: 4.3667, pop: 38000, hub: false, fh: 32, transit: ['R0','A12'] },
  { nis: '23047', name: 'Machelen', nl: 'Machelen', postal: ['1830'], lat: 50.9139, lng: 4.4361, pop: 15400, hub: false, fh: 31, transit: ['R0','E19'] },
  { nis: '23086', name: 'Steenokkerzeel', nl: 'Steenokkerzeel', postal: ['1820'], lat: 50.9167, lng: 4.5167, pop: 12100, hub: false, fh: 30, transit: ['E19','N21'] },
  { nis: '23038', name: 'Kortenberg', nl: 'Kortenberg', postal: ['3070','3071','3078'], lat: 50.8861, lng: 4.5889, pop: 20300, hub: false, fh: 29, transit: ['E40','N2'] },
  { nis: '23002', name: 'Asse', nl: 'Asse', postal: ['1730','1731'], lat: 50.9111, lng: 4.1972, pop: 33800, hub: false, fh: 31, transit: ['N9','R0'] },
  { nis: '23016', name: 'Dilbeek', nl: 'Dilbeek', postal: ['1700','1701','1702','1703'], lat: 50.8472, lng: 4.2611, pop: 43400, hub: false, fh: 30, transit: ['R0','N8'] },
  { nis: '23027', name: 'Hal', nl: 'Halle', postal: ['1500','1501','1502'], lat: 50.7361, lng: 4.2333, pop: 40000, hub: true, fh: 32, transit: ['E19','R0'] },
  { nis: '23003', name: 'Beersel', nl: 'Beersel', postal: ['1650','1651','1652','1653','1654'], lat: 50.7667, lng: 4.3000, pop: 25400, hub: false, fh: 30, transit: ['R0'] },
  { nis: '23077', name: 'Leeuw-Saint-Pierre', nl: 'Sint-Pieters-Leeuw', postal: ['1600','1601','1602'], lat: 50.7806, lng: 4.2444, pop: 34600, hub: false, fh: 31, transit: ['R0','N6'] },
  { nis: '23052', name: 'Meise', nl: 'Meise', postal: ['1860','1861'], lat: 50.9417, lng: 4.3250, pop: 19400, hub: false, fh: 31, transit: ['A12'] },
  { nis: '23049', name: 'Merchtem', nl: 'Merchtem', postal: ['1785'], lat: 50.9583, lng: 4.2333, pop: 16500, hub: false, fh: 32, transit: ['N211'] },
  { nis: '24062', name: 'Louvain', nl: 'Leuven', postal: ['3000','3001','3010','3012','3018'], lat: 50.8798, lng: 4.7005, pop: 102126, hub: true, fh: 27, transit: ['E40','E314'] },
  { nis: '24038', name: 'Herent', nl: 'Herent', postal: ['3020'], lat: 50.9083, lng: 4.6722, pop: 22000, hub: false, fh: 28, transit: ['N26'] },
  { nis: '24009', name: 'Bertem', nl: 'Bertem', postal: ['3060'], lat: 50.8639, lng: 4.6278, pop: 10000, hub: false, fh: 27, transit: ['E40'] },
  { nis: '23032', name: 'Huldenberg', nl: 'Huldenberg', postal: ['3040'], lat: 50.7889, lng: 4.5806, pop: 9900, hub: false, fh: 26, transit: ['N253'] },
  { nis: '23062', name: 'Overijse', nl: 'Overijse', postal: ['3090'], lat: 50.7667, lng: 4.5333, pop: 25400, hub: false, fh: 27, transit: ['E411','N4'] },
  { nis: '23033', name: 'Hoeilaart', nl: 'Hoeilaart', postal: ['1560'], lat: 50.7667, lng: 4.4667, pop: 11400, hub: false, fh: 27, transit: ['R0'] },
  { nis: '23081', name: 'Tervuren', nl: 'Tervuren', postal: ['3080'], lat: 50.8167, lng: 4.5167, pop: 22600, hub: false, fh: 28, transit: ['R0','N3'] },
  { nis: '24107', name: 'Tirlemont', nl: 'Tienen', postal: ['3300'], lat: 50.8000, lng: 4.9333, pop: 35000, hub: true, fh: 28, transit: ['E40','N3'] },
  { nis: '24001', name: 'Aarschot', nl: 'Aarschot', postal: ['3200'], lat: 50.9833, lng: 4.8333, pop: 30000, hub: true, fh: 26, transit: ['E314','N19'] },
  { nis: '24020', name: 'Diest', nl: 'Diest', postal: ['3290'], lat: 50.9833, lng: 5.0500, pop: 24000, hub: true, fh: 26, transit: ['E314','N2'] },
  { nis: '24059', name: 'Landen', nl: 'Landen', postal: ['3400'], lat: 50.7500, lng: 5.0833, pop: 16000, hub: false, fh: 27, transit: ['E40'] },
  { nis: '23080', name: 'Ternat', nl: 'Ternat', postal: ['1740','1741','1742'], lat: 50.8667, lng: 4.1667, pop: 15800, hub: false, fh: 30, transit: ['E40'] },
  { nis: '23079', name: 'Lennik', nl: 'Lennik', postal: ['1750'], lat: 50.8000, lng: 4.1500, pop: 9000, hub: false, fh: 30, transit: ['N8'] },
  { nis: '23078', name: 'Roosdaal', nl: 'Roosdaal', postal: ['1760'], lat: 50.8500, lng: 4.0833, pop: 11600, hub: false, fh: 30, transit: ['N8'] },
  { nis: '23048', name: 'Meise-Wolvertem', nl: 'Wolvertem', postal: ['1861'], lat: 50.9500, lng: 4.3167, pop: 7000, hub: false, fh: 31, transit: ['A12'] },
  { nis: '23045', name: 'Liedekerke', nl: 'Liedekerke', postal: ['1770'], lat: 50.8667, lng: 4.0833, pop: 13200, hub: false, fh: 31, transit: ['E40'] },
];

const ALL_MASTER = [
  ...BRUXELLES_19.map((c) => ({ ...c, prov_code: '04', prov_slug: 'bruxelles-capitale' })),
  ...BRABANT_WALLON_27.map((c) => ({ ...c, prov_code: '03', prov_slug: 'brabant-wallon' })),
  ...HAINAUT_69.map((c) => ({ ...c, prov_code: '05', prov_slug: 'hainaut' })),
  ...LIEGE_81.map((c) => ({ ...c, prov_code: '06', prov_slug: 'liege' })),
  ...NAMUR_38.map((c) => ({ ...c, prov_code: '09', prov_slug: 'namur' })),
  ...LUXEMBOURG_44.map((c) => ({ ...c, prov_code: '08', prov_slug: 'luxembourg' })),
  ...FLANDERS_35.map((c) => ({ ...c, prov_code: '20', prov_slug: 'brabant-flamand' })),
];

function generateMigrationSql() {
  const seen = new Set();
  const deduped = [];
  for (const item of ALL_MASTER) {
    const s = slugify(item.name);
    if (!seen.has(s)) {
      seen.add(s);
      deduped.push({ ...item, slug_fr: s, slug_nl: slugify(item.nl) });
    }
  }

  let sql = `-- ============================================================
-- Chauffagiste-Belga: Exhaustive 311 Communes Geographic Dataset
-- Migration: 20260101000003_complete_316_communes
-- Direct Truncate & Clean Master Seed
-- ============================================================

-- 1. Ensure all 7 Provinces exist
INSERT INTO provinces (nis_code, name_fr, name_nl, slug_fr, slug_nl, region, capital_fr, latitude, longitude) VALUES
('04', 'Bruxelles-Capitale', 'Brussel Hoofdstedelijk Gewest', 'bruxelles-capitale', 'brussel-hoofdstedelijk-gewest', 'brussels', 'Bruxelles', 50.8503, 4.3517),
('03', 'Brabant wallon', 'Waals-Brabant', 'brabant-wallon', 'waals-brabant', 'wallonia', 'Wavre', 50.7175, 4.6122),
('05', 'Hainaut', 'Henegouwen', 'hainaut', 'henegouwen', 'wallonia', 'Mons', 50.4542, 3.9562),
('06', 'Liège', 'Luik', 'liege', 'luik', 'wallonia', 'Liège', 50.6326, 5.5797),
('08', 'Luxembourg', 'Luxemburg', 'luxembourg', 'luxemburg', 'wallonia', 'Arlon', 49.6831, 5.8163),
('09', 'Namur', 'Namen', 'namur', 'namen', 'wallonia', 'Namur', 50.4669, 4.8675),
('20', 'Brabant flamand', 'Vlaams-Brabant', 'brabant-flamand', 'vlaams-brabant', 'flanders', 'Louvain', 50.8798, 4.7005)
ON CONFLICT (nis_code) DO UPDATE SET
  name_fr = EXCLUDED.name_fr,
  slug_fr = EXCLUDED.slug_fr;

-- 2. Ensure find_nearby_communes PostGIS RPC function is up to date
CREATE OR REPLACE FUNCTION find_nearby_communes(
    target_commune_id UUID,
    limit_count INT DEFAULT 6
)
RETURNS TABLE (
    id UUID,
    name_fr VARCHAR,
    slug_fr VARCHAR,
    province_name_fr VARCHAR,
    distance_km FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    target_lat FLOAT;
    target_lng FLOAT;
BEGIN
    SELECT latitude, longitude INTO target_lat, target_lng
    FROM communes
    WHERE communes.id = target_commune_id;

    IF target_lat IS NULL OR target_lng IS NULL THEN
        RETURN;
    END IF;

    RETURN QUERY
    SELECT 
        c.id,
        c.name_fr,
        c.slug_fr,
        p.name_fr AS province_name_fr,
        ROUND(
            (6371 * acos(
                LEAST(1.0, GREATEST(-1.0,
                    cos(radians(target_lat)) * cos(radians(c.latitude)) *
                    cos(radians(c.longitude) - radians(target_lng)) +
                    sin(radians(target_lat)) * sin(radians(c.latitude))
                ))
            ))::numeric, 1
        )::FLOAT AS distance_km
    FROM communes c
    JOIN provinces p ON c.province_id = p.id
    WHERE c.id != target_commune_id
      AND c.is_active = TRUE
      AND c.latitude IS NOT NULL
      AND c.longitude IS NOT NULL
    ORDER BY (
        6371 * acos(
            LEAST(1.0, GREATEST(-1.0,
                cos(radians(target_lat)) * cos(radians(c.latitude)) *
                cos(radians(c.longitude) - radians(target_lng)) +
                sin(radians(target_lat)) * sin(radians(c.latitude))
            ))
        )
    ) ASC
    LIMIT limit_count;
END;
$$;

-- 3. Clear existing communes table cleanly
TRUNCATE TABLE communes CASCADE;

-- 4. Direct insertion of all 311 official Belgian municipalities
INSERT INTO communes (
  nis_code,
  name_fr,
  name_nl,
  slug_fr,
  slug_nl,
  postal_codes,
  latitude,
  longitude,
  province_id,
  population,
  is_major_hub,
  water_hardness_fh,
  transit_axes,
  is_active
) VALUES
`;

  const values = deduped.map((c) => {
    const postals = `ARRAY[${c.postal.map((p) => `'${p}'`).join(',')}]::text[]`;
    const transit = c.transit && c.transit.length > 0 
      ? `ARRAY[${c.transit.map((t) => `'${t}'`).join(',')}]::text[]`
      : `'{}'::text[]`;
    const nameFr = c.name.replace(/'/g, "''");
    const nameNl = c.nl.replace(/'/g, "''");

    return `(
    '${c.nis}',
    '${nameFr}',
    '${nameNl}',
    '${c.slug_fr}',
    '${c.slug_nl}',
    ${postals},
    ${c.lat},
    ${c.lng},
    (SELECT id FROM provinces WHERE nis_code = '${c.prov_code}'),
    ${c.pop},
    ${c.hub ? 'TRUE' : 'FALSE'},
    ${c.fh},
    ${transit},
    TRUE
  )`;
  });

  sql += values.join(',\n') + `;\n`;

  const targetFile = path.resolve('supabase/migrations/20260101000003_complete_316_communes.sql');
  fs.writeFileSync(targetFile, sql, 'utf8');
  console.log('Successfully written clean truncate migration to:', targetFile);
}

generateMigrationSql();

module.exports = { ALL_MASTER, slugify };
