-- Run this once in Supabase Dashboard → SQL Editor
-- Invoices are stored as flexible JSON documents (NoSQL-style) since
-- different vendors' invoices have different header fields and different
-- line-item columns (batch no., HSN code, expiry, discount %, etc.).
create table if not exists invoices (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

alter table invoices enable row level security;

-- Matches the same open/anon-key access pattern already used by the other
-- tables in this app (customers, tasks, attendance, etc.). Tighten this if
-- you lock down RLS elsewhere.
create policy "invoices anon all" on invoices
  for all
  to anon
  using (true)
  with check (true);
