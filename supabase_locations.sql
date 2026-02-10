-- Tabla locations: posición GPS del dashboard (War Room) en tiempo real.
-- Ejecutar en el SQL Editor de Supabase: https://supabase.com/dashboard/project/svpurpvbiujhcbiugrkh/sql

CREATE TABLE IF NOT EXISTS public.locations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    accuracy double precision
);

-- Índice para consultas por usuario y tiempo
CREATE INDEX IF NOT EXISTS idx_locations_user_created ON public.locations (user_id, created_at DESC);

-- Permitir inserción con anon key (dashboard en producción)
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert and select locations"
    ON public.locations FOR ALL
    USING (true)
    WITH CHECK (true);
