// =======================
// Refdata mape (Mobile.de)
// =======================

// Helper: normalizacija ključa (case-insensitive, underscore)
const norm = (v) => String(v || '').trim().toUpperCase().replace(/\s+/g, '_');

// 1) Gearboxes (menjači)
const GEARBOX_MAP = {
  MANUAL_GEAR: 'Manuell',
  AUTOMATIC_GEAR: 'Automatik',
  SEMIAUTOMATIC_GEAR: 'Halbautomatik',

  // aliasi koji se nekad pojavljuju u podacima
  MANUAL: 'Manuell',
  AUTOMATIC: 'Automatik',
  SEMI_AUTOMATIC: 'Halbautomatik',
};

export function mapGearbox(code) {
  if (!code) return 'Automatik';
  const key = norm(code);
  return GEARBOX_MAP[key] || code;
}

// (opciono) obrnuta mapa: label -> API kod
const GEARBOX_REVERSE = Object.fromEntries(
  Object.entries(GEARBOX_MAP).map(([k, v]) => [v.toLowerCase(), k])
);
export function unmapGearbox(label) {
  if (!label) return undefined;
  const key = String(label).toLowerCase().trim();
  return GEARBOX_REVERSE[key] || label;
}

// 2) Fuels (goriva)
const FUEL_MAP = {
  PETROL: 'Benzin',
  DIESEL: 'Diesel',
  LPG: 'Autogas (LPG)',
  CNG: 'Erdgas (CNG)',
  ELECTRICITY: 'Elektro',
  HYBRID: 'Hybrid (Benzin/Elektro)',
  HYDROGENIUM: 'Wasserstoff',
  ETHANOL: 'Ethanol (FFV, E85 etc.)',
  HYBRID_DIESEL: 'Hybrid (Diesel/Elektro)',
  OTHER: 'Andere',
};

export function mapFuel(code) {
  if (!code) return 'Benzin';
  const key = norm(code);
  return FUEL_MAP[key] || code;
}

const FUEL_REVERSE = Object.fromEntries(
  Object.entries(FUEL_MAP).map(([k, v]) => [v.toLowerCase(), k])
);
export function unmapFuel(label) {
  if (!label) return undefined;
  const key = String(label).toLowerCase().trim();
  return FUEL_REVERSE[key] || label;
}

// 3) Colors (boje)
// Napomena: Mobile.de ima širi skup; ovde su najčešći, proširi po potrebi.
const COLOR_MAP = {
  BEIGE: 'Beige',
  BLACK: 'Schwarz',
  BLUE: 'Blau',
  BROWN: 'Braun',
  BRONZE: 'Bronze',
  GOLD: 'Gold',
  GREEN: 'Grün',
  GREY: 'Grau',
  ORANGE: 'Orange',
  PURPLE: 'Violett',
  RED: 'Rot',
  SILVER: 'Silber',
  WHITE: 'Weiß',
  YELLOW: 'Gelb',
  TURQUOISE: 'Türkis',
  PINK: 'Pink',
  OTHER: 'Sonstiges',

  // često dolaze i nijanse
  DARK_BLUE: 'Dunkelblau',
  LIGHT_BLUE: 'Hellblau',
  DARK_GREY: 'Dunkelgrau',
  LIGHT_GREY: 'Hellgrau',
  DARK_GREEN: 'Dunkelgrün',
  LIGHT_GREEN: 'Hellgrün',
  ANTHRACITE: 'Anthrazit',
  CHAMPAGNE: 'Champagner',
};

export function mapColor(code) {
  if (!code) return 'Schwarz';
  const key = norm(code);
  return COLOR_MAP[key] || capitalizeFirst(code.toLowerCase());
}

const COLOR_REVERSE = Object.fromEntries(
  Object.entries(COLOR_MAP).map(([k, v]) => [v.toLowerCase(), k])
);
export function unmapColor(label) {
  if (!label) return undefined;
  const key = String(label).toLowerCase().trim();
  return COLOR_REVERSE[key] || label;
}

// 4) Emission classes (EURO norme)
const EMISSION_CLASS_MAP = {
  EURO1: 'Euro 1',
  EURO2: 'Euro 2',
  EURO3: 'Euro 3',
  EURO4: 'Euro 4',
  EURO5: 'Euro 5',
  EURO6: 'Euro 6',
  EURO6C: 'Euro 6c',
  EURO6D_TEMP: 'Euro 6d-TEMP',
  EURO6D: 'Euro 6d',
  EEV: 'EEV',
  OTHER: 'Sonstiges',

  // tolerancija na stil upisa
  EURO_1: 'Euro 1',
  EURO_2: 'Euro 2',
  EURO_3: 'Euro 3',
  EURO_4: 'Euro 4',
  EURO_5: 'Euro 5',
  EURO_6: 'Euro 6',
  EURO_6C: 'Euro 6c',
  EURO_6D_TEMP: 'Euro 6d-TEMP',
  EURO_6D: 'Euro 6d',
};

export function mapEmissionClass(code) {
  if (!code) return 'Euro 6';
  const key = norm(code);
  return EMISSION_CLASS_MAP[key] || code;
}

const EMISSION_CLASS_REVERSE = Object.fromEntries(
  Object.entries(EMISSION_CLASS_MAP).map(([k, v]) => [v.toLowerCase(), k])
);
export function unmapEmissionClass(label) {
  if (!label) return undefined;
  const key = String(label).toLowerCase().trim();
  return EMISSION_CLASS_REVERSE[key] || label;
}

// 5) Conditions (stanje vozila)
const CONDITION_MAP = {
  NEW: 'Neuwagen',
  USED: 'Gebraucht',
};

export function mapCondition(code) {
  if (!code) return 'Gebraucht';
  const key = norm(code);
  return CONDITION_MAP[key] || code;
}

const CONDITION_REVERSE = Object.fromEntries(
  Object.entries(CONDITION_MAP).map(([k, v]) => [v.toLowerCase(), k])
);
export function unmapCondition(label) {
  if (!label) return undefined;
  const key = String(label).toLowerCase().trim();
  return CONDITION_REVERSE[key] || label;
}

// 6) DriveTypes (Antriebsarten)
const DRIVETYPE_MAP = {
  FRONT: 'Frontantrieb',
  REAR: 'Heckantrieb',
  ALL_WHEEL: 'Allradantrieb',
};

export function mapDriveType(code) {
  if (!code) return 'Frontantrieb';
  const key = norm(code);
  return DRIVETYPE_MAP[key] || code;
}

const DRIVETYPE_REVERSE = Object.fromEntries(
  Object.entries(DRIVETYPE_MAP).map(([k, v]) => [v.toLowerCase(), k])
);
export function unmapDriveType(label) {
  if (!label) return undefined;
  const key = String(label).toLowerCase().trim();
  return DRIVETYPE_REVERSE[key] || label;
}

// 7) DoorCounts (Anzahl Türen)
const DOORCOUNT_MAP = {
  TWO_OR_THREE: '2/3 Türen',
  FOUR_OR_FIVE: '4/5 Türen',
  SIX_OR_SEVEN: '6/7 Türen',
};


export function mapDoorCount(code) {
  if (!code) return undefined;
  const key = norm(code);
  return DOORCOUNT_MAP[key] || code;
}

const DOORCOUNT_REVERSE = Object.fromEntries(
  Object.entries(DOORCOUNT_MAP).map(([k, v]) => [v.toLowerCase(), k])
);
export function unmapDoorCount(label) {
  if (!label) return undefined;
  const key = String(label).toLowerCase().trim();
  return DOORCOUNT_REVERSE[key] || label;
}

// Utility: lepa kapitalizacija ako boja stigne nepoznata (npr. "midnight blue")
function capitalizeFirst(s) {
  return s.replace(/\b\p{L}/gu, (m) => m.toUpperCase());
}

export function mapCarValues(raw) {
  if (!raw) return null

  return {
    ...raw,
    fuel: mapFuel(raw.fuel),
    gearbox: mapGearbox(raw.gearbox),
    exteriorColor: mapColor(raw.exteriorColor),
    interiorColor: mapColor(raw.interiorColor),
    emissionClass: mapEmissionClass(raw.emissionClass),
    condition: mapCondition(raw.condition),
    driveType: mapDriveType(raw.driveType),
    doors: mapDoorCount(raw.doors),
  }
}