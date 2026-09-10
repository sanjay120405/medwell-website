-- Run this once in Supabase Dashboard → SQL Editor.
-- Adds an optional "MRP" (original / strike-through price) column to
-- catalog_products. When mrp is set and greater than price, products.html
-- shows a strike-through MRP + a "-X%" discount badge next to the price.
alter table catalog_products add column if not exists mrp numeric;
