-- ============================================================
-- 1gate @ Supabase — copy & paste KE SEMUA ke SQL editor di supabase.com
-- Project ref: urjtpcwwbqmsjxgycvin
-- ============================================================

-- Stok barang per user
create table public.stok (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  nama text not null,
  qty integer default 0 not null,
  lokasi text,
  created_at timestamp with time zone default now()
);

-- Rekap absensi per user
create table public.absensi (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  nama text not null,
  tgl date default current_date not null,
  masuk time,
  pulang time,
  status text check (status in ('Hadir','Izin','Alpha','Lembur')) default 'Hadir',
  created_at timestamp with time zone default now()
);

-- Data pelanggan + tagihan per user
create table public.pelanggan (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade not null,
  nama text not null,
  telpon text,
  tagihan bigint default 0 not null,
  status text check (status in ('Lunas','Pending','Overdue')) default 'Pending',
  created_at timestamp with time zone default now()
);

-- ========== ROW LEVEL SECURITY (tiap user hanya lihat data sendiri) ==========
alter table public.stok enable row level security;
alter table public.absensi enable row level security;
alter table public.pelanggan enable row level security;

create policy "Stok milik user" on public.stok for all using (auth.uid() = user_id);
create policy "Absensi milik user" on public.absensi for all using (auth.uid() = user_id);
create policy "Pelanggan milik user" on public.pelanggan for all using (auth.uid() = user_id);

-- Index supaya query per-user cepat
create index if not exists stok_user_idx on public.stok (user_id);
create index if not exists absensi_user_idx on public.absensi (user_id);
create index if not exists pelanggan_user_idx on public.pelanggan (user_id);

-- Enable realtime broadcasts (Supabase realtime via websockets)
-- (tabel publik otomatis realtime-capable; cukup SELECT/INSERT/UPDATE di app)

-- Optional: trigger updated_at (not strictly required untuk MVP ini)
create table if not exists public.schema_migrations (version text primary key);
