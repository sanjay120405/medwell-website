-- Run this once in Supabase Dashboard → SQL Editor
-- (After creating a PUBLIC storage bucket named "catalog-images" via
-- Dashboard → Storage → New bucket — bucket creation itself needs the
-- dashboard, the anon key can't create buckets.)

-- Full catalog: product name, category, image, and price all live here now.
-- Categories themselves stay a fixed list in code (8 categories rarely
-- change) — only the products within them move to Supabase, which is
-- what actually needed to become bulk-editable.
create table if not exists catalog_products (
  id bigint generated always as identity primary key,
  category_id text not null,
  category_name text not null,
  product_name text not null,
  image_path text,
  price numeric,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table catalog_products enable row level security;

create policy "catalog_products anon all" on catalog_products
  for all
  to anon
  using (true)
  with check (true);

create index if not exists catalog_products_category_idx on catalog_products (category_id);

-- Allow the anon key to upload/read/delete files in the catalog-images
-- bucket (same open-access pattern already used everywhere in this app).
create policy "catalog-images anon all"
  on storage.objects
  for all
  to anon
  using (bucket_id = 'catalog-images')
  with check (bucket_id = 'catalog-images');
