// Category metadata for the showcase catalog (products.html + the
// per-category /product/<slug>/ pages + admin.html's "Master" and
// "Product Prices" tabs).
//
// Categories themselves live in Supabase's `catalog_categories` table so
// they can be added/renamed/reordered/deleted from the admin "Master" tab
// without a code deploy. CATEGORIES_DEFAULT below is only a fallback used
// if that table is empty or unreachable, so the site still renders.
//
// `products` starts empty on every category and gets populated at runtime
// from Supabase's `catalog_products` table (see loadCatalogProducts() in
// products.html / admPricesInit() in admin.html).
const CATEGORIES_DEFAULT = [
  { id: 'surgical-instruments', slug: 'surgicalinstruments', name: 'Surgical Instruments', desc: 'High-grade stainless steel tools for all surgical specialties', emoji: '✂️' },
  { id: 'surgical-disposables', slug: 'surgicaldisposables', name: 'Surgical Disposables', desc: 'Sterile single-use items for infection prevention and hygiene', emoji: '🧤' },
  { id: 'hospital-furniture', slug: 'hospitalfurniture', name: 'Hospital Furniture', desc: 'Beds, trolleys, stretchers and complete ward equipment', emoji: '🛏️' },
  { id: 'rehabilitation-aids', slug: 'rehabilitationaids', name: 'Rehabilitation Aids', desc: 'Supports, braces and mobility aids for recovery and comfort', emoji: '♿' },
  { id: 'home-care', slug: 'diaper', name: 'Diaper', desc: 'Adult and baby diapers for comfort and hygiene', emoji: '🍼' },
  { id: 'bp-apparatus', slug: 'gloves', name: 'Gloves', desc: 'Surgical and examination gloves for hygiene and protection', emoji: '🧤' },
  { id: 'ss-wares', slug: 'sswares', name: 'SS Wares', desc: 'Stainless steel surgical trays, drums, bowls and sterilization equipment', emoji: '🥣' },
  { id: 'hospital-needs', slug: 'hospitalneeds', name: 'Hospital Needs', desc: 'OT supplies, diagnostic instruments and essential hospital equipment', emoji: '🏥' },
  { id: 'bp-monitor', slug: 'bpmonitor', name: 'BP Monitor', desc: 'Digital and manual blood pressure monitors', emoji: '💓' },
  { id: 'nebulizer', slug: 'nebulizer', name: 'Nebulizer', desc: 'Nebulizers for respiratory care at home and hospital', emoji: '💨' },
  { id: 'airbed', slug: 'airbed', name: 'Airbed', desc: 'Air mattresses for bedsore prevention and patient comfort', emoji: '🛌' },
  { id: 'suction-machine', slug: 'suctionmachine', name: 'Suction Machine', desc: 'Portable and electric suction machines for clinical use', emoji: '🌀' },
  { id: 'wipes', slug: 'wipes', name: 'Wipes', desc: 'Wet wipes and cleansing wipes for patient hygiene', emoji: '🧻' },
  { id: 'thermometer', slug: 'thermometer', name: 'Thermometer', desc: 'Digital and infrared thermometers for accurate readings', emoji: '🌡️' },
  { id: 'stethoscope', slug: 'stethoscope', name: 'Stethoscope', desc: 'Stethoscopes for clinical examination and diagnosis', emoji: '🩺' },
  { id: 'walker', slug: 'walker', name: 'Walker', desc: 'Walking frames and walkers for mobility support', emoji: '🚶' },
  { id: 'glucometer', slug: 'glucometer', name: 'Glucometer', desc: 'Blood glucose monitoring devices and test strips', emoji: '🩸' },
  { id: 'back-rest', slug: 'backrest', name: 'Back Rest', desc: 'Adjustable back rests for bedridden patient comfort', emoji: '🪑' },
  { id: 'commode-chair', slug: 'commodechair', name: 'Commode Chair', desc: 'Commode chairs for patients with limited mobility', emoji: '🚽' },
];

const CATALOG_SB_URL = 'https://vogxaylmrzulbdltxrwv.supabase.co';
const CATALOG_SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZ3hheWxtcnp1bGJkbHR4cnd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNzIwNjksImV4cCI6MjA5Njg0ODA2OX0.ARbGKniGQzbwmLB93Vey3Mr2vXsLYZIlP4nJRMqhfts';

// Populated by loadCategories(). Kept as a stable array reference (mutated
// in place) so code elsewhere can hold onto `CATEGORIES` before it's loaded.
const CATEGORIES = [];

function categoriesFromRows(rows) {
  return rows.map(r => ({ id: r.id, slug: r.slug, name: r.name, desc: r.description, emoji: r.emoji, sortOrder: r.sort_order, products: [] }));
}

// Fetches categories from Supabase and replaces CATEGORIES' contents in
// place. Falls back to CATEGORIES_DEFAULT if the table is empty/unreachable
// so the site still works before the `catalog_categories` table is set up.
async function loadCategories() {
  let rows = null;
  try {
    const sb = window.supabase.createClient(CATALOG_SB_URL, CATALOG_SB_KEY);
    const { data, error } = await sb.from('catalog_categories').select('*').order('sort_order', { ascending: true });
    if (error) throw error;
    rows = data;
  } catch (err) {
    console.error('Category load error:', err && err.message);
  }

  CATEGORIES.length = 0;
  if (rows && rows.length > 0) {
    categoriesFromRows(rows).forEach(c => CATEGORIES.push(c));
  } else {
    CATEGORIES_DEFAULT.forEach((c, i) => CATEGORIES.push({ ...c, sortOrder: i, products: [] }));
  }
  return CATEGORIES;
}
