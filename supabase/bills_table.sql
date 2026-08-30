-- Run this once in Supabase Dashboard → SQL Editor
-- Records every bill sent from billing.html so the Report view can show
-- sales stats, filter by day/month/year, and look up a customer's history.
create table if not exists bills (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0
);

alter table bills enable row level security;

-- Matches the same open/anon-key access pattern already used by the other
-- tables in this app (customers, tasks, attendance, etc.).
create policy "bills anon all" on bills
  for all
  to anon
  using (true)
  with check (true);

-- Speeds up the customer-history search by name/phone.
create index if not exists bills_customer_phone_idx on bills (customer_phone);
create index if not exists bills_created_at_idx on bills (created_at);
