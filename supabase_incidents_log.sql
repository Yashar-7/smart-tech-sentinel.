-- Ejecutar en Supabase SQL Editor para crear la tabla del Black Box.
-- Tabla: incidents_log (registro automático al entrar en Zona Restringida)

create table if not exists public.incidents_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_time text,
  latitude double precision,
  longitude double precision,
  speed_kmh numeric,
  incident_type text default 'restricted_zone',
  image_url text
);

-- Si la tabla ya existía sin image_url, añadir la columna:
-- alter table public.incidents_log add column if not exists image_url text;

-- Permitir inserción y lectura con la clave anónima (anon key) del proyecto
alter table public.incidents_log enable row level security;

create policy "Allow anonymous insert and select"
  on public.incidents_log
  for all
  using (true)
  with check (true);
