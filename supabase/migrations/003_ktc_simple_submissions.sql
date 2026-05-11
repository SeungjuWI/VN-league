-- Simple submissions table for ideathon
-- Replaces complex team-based flow with direct user submission

create table if not exists ktc_simple_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references ktc_users(id) on delete cascade,
  team_name text,
  members text,
  deck_url text,
  demo_url text,
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id)
);

alter table ktc_simple_submissions enable row level security;
create policy ktc_simple_sub_insert on ktc_simple_submissions for insert with check (true);
create policy ktc_simple_sub_select on ktc_simple_submissions for select using (true);
create policy ktc_simple_sub_update on ktc_simple_submissions for update using (true);

create index ktc_idx_simple_sub_user on ktc_simple_submissions (user_id);
