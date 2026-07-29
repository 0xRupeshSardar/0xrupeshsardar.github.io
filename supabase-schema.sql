-- ============================================================
-- 0xRupesh Portfolio — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New query)
-- ============================================================

-- 1) Contact form submissions
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- 2) Blog posts
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  content       text,                 -- markdown body (null for private/encrypted posts)
  date          date not null default current_date,
  read_time     text default '5 min',
  tag           text,
  is_private    boolean default false,
  encrypted_src text,                 -- path to .enc file or inline base64
  published     boolean default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 3) Blog comments
create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  post_slug  text not null references public.posts(slug) on delete cascade,
  author     text not null,
  body       text not null,
  created_at timestamptz not null default now()
);

-- 4) Page view analytics
create table if not exists public.page_views (
  id         uuid primary key default gen_random_uuid(),
  path       text not null,
  slug       text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security — allow public read + controlled write
-- ============================================================
alter table public.contact_submissions enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.page_views enable row level security;

-- Contact: anyone can submit, no public read (private to you)
create policy "anon can submit contact" on public.contact_submissions
  for insert to anon, authenticated with check (true);

-- Posts: public can read published posts
create policy "public read published posts" on public.posts
  for select to anon, authenticated using (published = true);

-- Comments: public can read + post comments
create policy "public read comments" on public.comments
  for select to anon, authenticated using (true);
create policy "anon can post comments" on public.comments
  for insert to anon, authenticated with check (true);

-- Analytics: anyone can log a view, no public read
create policy "anon can log view" on public.page_views
  for insert to anon, authenticated with check (true);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_posts_slug on public.posts(slug);
create index if not exists idx_posts_date on public.posts(date desc);
create index if not exists idx_comments_post on public.comments(post_slug, created_at desc);
create index if not exists idx_views_path on public.page_views(path, created_at desc);