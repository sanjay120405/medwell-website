// Category metadata for the showcase catalog (products.html + admin.html's
// "Product Prices" tab). The 8 categories rarely change, so they stay a
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
    thumb: 'surgical instruments.png',
    products: []
  },
  {
    id: 'surgical-disposables',
    name: 'Surgical Disposables',
    desc: 'Sterile single-use items for infection prevention and hygiene',
    thumb: 'Surgical Disposables.png',
    products: []
  },
  {
    id: 'hospital-furniture',
    name: 'Hospital Furniture',
    desc: 'Beds, trolleys, stretchers and complete ward equipment',
    thumb: 'Hospital Furniture.png',
    products: []
  },
  {
    id: 'rehabilitation-aids',
    name: 'Rehabilitation Aids',
    desc: 'Supports, braces and mobility aids for recovery and comfort',
    thumb: 'Patient Wheelchairs.png',
    products: []
  },
  {
    id: 'home-care',
    name: 'Home Care',
    desc: 'Essential home care products for patient comfort and hygiene',
    thumb: 'Home Care Products.png',
    products: []
  },
  {
    id: 'bp-apparatus',
    name: 'BP Apparatus',
    desc: 'Digital and manual blood pressure monitoring devices',
    thumb: 'BP Apparatus.png',
    products: []
  },
  {
    id: 'ss-wares',
    name: 'SS Wares',
    desc: 'Stainless steel surgical trays, drums, bowls and sterilization equipment',
    thumb: 'SS Wares.png',
    products: []
  },
  {
    id: 'hospital-needs',
    name: 'Hospital Needs',
    desc: 'OT supplies, diagnostic instruments and essential hospital equipment',
    thumb: 'Hospital Needs.png',
    products: []
  },
];
