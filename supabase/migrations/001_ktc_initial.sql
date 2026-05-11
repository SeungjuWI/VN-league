-- K-Tech Connect tables (prefix: ktc_)
-- Shares auth.users with SalaryMap. Does NOT touch existing tables.

-- 참가자 프로필 (K-Tech 전용 추가 정보)
create table ktc_profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  email text,
  phone text,
  date_of_birth date,
  city text,
  organization text,
  role_in_org text,
  preferred_locale text default 'vi',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 참가 등록 (인터뷰 / 아이디어톤 / 멘토링)
create table ktc_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  type text not null check (type in ('interview', 'ideathon', 'mentoring')),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, type)
);

-- 아이디어톤 팀
create table ktc_teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text unique not null,
  leader_id uuid not null references auth.users on delete cascade,
  created_at timestamptz default now()
);

-- 팀 멤버
create table ktc_team_members (
  team_id uuid not null references ktc_teams on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  joined_at timestamptz default now(),
  primary key (team_id, user_id)
);

-- 아이디어톤 제출물
create table ktc_submissions (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references ktc_teams on delete cascade unique,
  idea_title text,
  problem_statement text,
  solution text,
  target_market text,
  abstract text,
  deck_path text,
  product_url text,
  video_url text,
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 인터뷰 슬롯
create table ktc_interview_slots (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  day int not null check (day in (1, 2, 3)),
  start_time time not null,
  end_time time not null,
  candidate_id uuid references auth.users on delete set null,
  status text not null default 'open' check (status in ('open', 'booked', 'completed', 'cancelled')),
  created_at timestamptz default now()
);

-- 멘토링 세션
create table ktc_mentoring_sessions (
  id uuid primary key default gen_random_uuid(),
  mentor_name text not null,
  day int not null check (day in (1, 2, 3)),
  session_num int not null,
  start_time time not null,
  end_time time not null,
  mentee_id uuid references auth.users on delete set null,
  topic text,
  status text not null default 'open' check (status in ('open', 'booked', 'completed')),
  created_at timestamptz default now()
);

-- Indexes
create index ktc_idx_registrations_user on ktc_registrations (user_id);
create index ktc_idx_registrations_type on ktc_registrations (type, status);
create index ktc_idx_team_members_user on ktc_team_members (user_id);
create index ktc_idx_interview_slots_day on ktc_interview_slots (day, status);
create index ktc_idx_mentoring_day on ktc_mentoring_sessions (day, status);

-- RLS
alter table ktc_profiles enable row level security;
alter table ktc_registrations enable row level security;
alter table ktc_teams enable row level security;
alter table ktc_team_members enable row level security;
alter table ktc_submissions enable row level security;
alter table ktc_interview_slots enable row level security;
alter table ktc_mentoring_sessions enable row level security;

-- ktc_profiles: 본인만 읽기/쓰기
create policy ktc_profiles_select on ktc_profiles for select using (auth.uid() = id);
create policy ktc_profiles_insert on ktc_profiles for insert with check (auth.uid() = id);
create policy ktc_profiles_update on ktc_profiles for update using (auth.uid() = id);

-- ktc_registrations: 본인만
create policy ktc_registrations_select on ktc_registrations for select using (auth.uid() = user_id);
create policy ktc_registrations_insert on ktc_registrations for insert with check (auth.uid() = user_id);
create policy ktc_registrations_update on ktc_registrations for update using (auth.uid() = user_id);

-- ktc_teams: 누구나 생성, 멤버만 조회
create policy ktc_teams_insert on ktc_teams for insert with check (auth.uid() = leader_id);
create policy ktc_teams_select on ktc_teams for select using (
  id in (select team_id from ktc_team_members where user_id = auth.uid())
);
create policy ktc_teams_update on ktc_teams for update using (auth.uid() = leader_id);

-- ktc_team_members: 멤버 조회, 본인 참가/탈퇴
create policy ktc_team_members_select on ktc_team_members for select using (
  team_id in (select team_id from ktc_team_members where user_id = auth.uid())
);
create policy ktc_team_members_insert on ktc_team_members for insert with check (auth.uid() = user_id);
create policy ktc_team_members_delete on ktc_team_members for delete using (auth.uid() = user_id);

-- ktc_submissions: 팀 멤버만
create policy ktc_submissions_select on ktc_submissions for select using (
  team_id in (select team_id from ktc_team_members where user_id = auth.uid())
);
create policy ktc_submissions_insert on ktc_submissions for insert with check (
  team_id in (select team_id from ktc_team_members where user_id = auth.uid())
);
create policy ktc_submissions_update on ktc_submissions for update using (
  team_id in (select team_id from ktc_team_members where user_id = auth.uid())
);

-- ktc_interview_slots: 누구나 조회, 본인 예약
create policy ktc_interview_slots_select on ktc_interview_slots for select using (true);
create policy ktc_interview_slots_update on ktc_interview_slots for update using (
  candidate_id is null or candidate_id = auth.uid()
);

-- ktc_mentoring_sessions: 누구나 조회, 본인 예약
create policy ktc_mentoring_sessions_select on ktc_mentoring_sessions for select using (true);
create policy ktc_mentoring_sessions_update on ktc_mentoring_sessions for update using (
  mentee_id is null or mentee_id = auth.uid()
);
