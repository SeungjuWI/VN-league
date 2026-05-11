-- Self-auth users table (independent from Supabase Auth)
-- Run this in Supabase SQL Editor

create table ktc_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  full_name text not null,
  phone text not null,
  organization text,
  preferred_locale text default 'vi',
  created_at timestamptz default now()
);

-- Public read/write via API (auth handled in app code via JWT)
alter table ktc_users enable row level security;

-- Allow anonymous insert (signup) and select (login check)
create policy ktc_users_insert on ktc_users for insert with check (true);
create policy ktc_users_select on ktc_users for select using (true);
create policy ktc_users_update on ktc_users for update using (true);

-- Update ktc_submissions, ktc_teams etc to reference ktc_users instead of auth.users
-- For now, keep them referencing auth.users — we'll use ktc_users.id as the user identifier
-- and store it in the existing tables without foreign key constraints

create index ktc_idx_users_email on ktc_users (email);
