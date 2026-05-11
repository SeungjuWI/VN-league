-- Community: posts & comments
-- Boards: notice (admin-only write), qa, free

create table if not exists ktc_posts (
  id uuid primary key default gen_random_uuid(),
  board text not null check (board in ('notice', 'qa', 'free')),
  author_id uuid not null references ktc_users(id) on delete cascade,
  author_name text not null,
  title text not null,
  content text not null,
  pinned boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists ktc_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references ktc_posts(id) on delete cascade,
  author_id uuid not null references ktc_users(id) on delete cascade,
  author_name text not null,
  content text not null,
  created_at timestamptz default now()
);

alter table ktc_posts enable row level security;
alter table ktc_comments enable row level security;

-- Posts: anyone can read, authenticated can insert, author can update/delete
create policy ktc_posts_select on ktc_posts for select using (true);
create policy ktc_posts_insert on ktc_posts for insert with check (true);
create policy ktc_posts_update on ktc_posts for update using (true);
create policy ktc_posts_delete on ktc_posts for delete using (true);

-- Comments: anyone can read, authenticated can insert, author can delete
create policy ktc_comments_select on ktc_comments for select using (true);
create policy ktc_comments_insert on ktc_comments for insert with check (true);
create policy ktc_comments_delete on ktc_comments for delete using (true);

create index ktc_idx_posts_board on ktc_posts (board, created_at desc);
create index ktc_idx_posts_author on ktc_posts (author_id);
create index ktc_idx_comments_post on ktc_comments (post_id, created_at asc);
