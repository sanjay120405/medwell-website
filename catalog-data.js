// Category metadata for the showcase catalog (products.html + admin.html's
// "Product Prices" tab). The categories rarely change, so they stay a
// fixed list here — but the actual products within each category (name,
// image, price) live in Supabase's `catalog_products` table, since that's
// what needed to become bulk-editable without a code deploy.
//
// `products` starts empty here and gets populated at runtime from Supabase
// (see loadCatalogProducts() in products.html / admPricesInit() in
// admin.html) — kept as a field so existing rendering code that reads
// cat.products keeps working unchanged.
const CATEGORIES = [
  {
    id: 'surgical-instruments',
    name: 'Surgical Instruments',
    desc: 'High-grade stainless steel tools for all surgical specialties',
    emoji: '✂️',
    products: []
  },
  {
    id: 'surgical-disposables',
    name: 'Surgical Disposables',
    desc: 'Sterile single-use items for infection prevention and hygiene',
    emoji: '🧤',
    products: []
  },
  {
    id: 'hospital-furniture',
    name: 'Hospital Furniture',
    desc: 'Beds, trolleys, stretchers and complete ward equipment',
    emoji: '🛏️',
    products: []
  },
  {
    id: 'rehabilitation-aids',
    name: 'Rehabilitation Aids',
    desc: 'Supports, braces and mobility aids for recovery and comfort',
    emoji: '♿',
    products: []
  },
  {
    id: 'home-care',
    name: 'Home Care',
    desc: 'Essential home care products for patient comfort and hygiene',
    emoji: '🏠',
    products: []
  },
  {
    id: 'bp-apparatus',
    name: 'BP Apparatus',
    desc: 'Digital and manual blood pressure monitoring devices',
    emoji: '🫀',
    products: []
  },
  {
    id: 'ss-wares',
    name: 'SS Wares',
    desc: 'Stainless steel surgical trays, drums, bowls and sterilization equipment',
    emoji: '🥣',
    products: []
  },
  {
    id: 'hospital-needs',
    name: 'Hospital Needs',
    desc: 'OT supplies, diagnostic instruments and essential hospital equipment',
    emoji: '🏥',
    products: []
  },
  {
    id: 'bp-monitor',
    name: 'BP Monitor',
    desc: 'Digital and manual blood pressure monitors',
    emoji: '💓',
    products: []
  },
  {
    id: 'nebulizer',
    name: 'Nebulizer',
    desc: 'Nebulizers for respiratory care at home and hospital',
    emoji: '💨',
    products: []
  },
  {
    id: 'airbed',
    name: 'Airbed',
    desc: 'Air mattresses for bedsore prevention and patient comfort',
    emoji: '🛌',
    products: []
  },
  {
    id: 'suction-machine',
    name: 'Suction Machine',
    desc: 'Portable and electric suction machines for clinical use',
    emoji: '🌀',
    products: []
  },
  {
    id: 'wipes',
    name: 'Wipes',
    desc: 'Wet wipes and cleansing wipes for patient hygiene',
    emoji: '🧻',
    products: []
  },
  {
    id: 'thermometer',
    name: 'Thermometer',
    desc: 'Digital and infrared thermometers for accurate readings',
    emoji: '🌡️',
    products: []
  },
  {
    id: 'stethoscope',
    name: 'Stethoscope',
    desc: 'Stethoscopes for clinical examination and diagnosis',
    emoji: '🩺',
    products: []
  },
  {
    id: 'walker',
    name: 'Walker',
    desc: 'Walking frames and walkers for mobility support',
    emoji: '🚶',
    products: []
  },
  {
    id: 'glucometer',
    name: 'Glucometer',
    desc: 'Blood glucose monitoring devices and test strips',
    emoji: '🩸',
    products: []
  },
  {
    id: 'back-rest',
    name: 'Back Rest',
    desc: 'Adjustable back rests for bedridden patient comfort',
    emoji: '🪑',
    products: []
  },
  {
    id: 'commode-chair',
    name: 'Commode Chair',
    desc: 'Commode chairs for patients with limited mobility',
    emoji: '🚽',
    products: []
  },
];
