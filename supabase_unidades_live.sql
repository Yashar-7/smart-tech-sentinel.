-- Tabla unidades_live para el mapa de Mar del Plata (Realtime).
-- Ejecutar en el SQL Editor de tu proyecto Supabase: https://supabase.com/dashboard/project/svpurpvbiujhcbiugrkh/sql

CREATE TABLE IF NOT EXISTS public.unidades_live (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text,
    lat double precision,
    lng double precision,
    status text,
    battery_pct smallint,
    signal_bars smallint
);

-- Si la tabla ya existía sin estas columnas, ejecutar:
-- ALTER TABLE public.unidades_live ADD COLUMN IF NOT EXISTS battery_pct smallint;
-- ALTER TABLE public.unidades_live ADD COLUMN IF NOT EXISTS signal_bars smallint;

-- Habilitar Realtime para que el dashboard escuche INSERT/UPDATE/DELETE
-- (Si ya está en la publicación, ignora el error "already in publication")
ALTER PUBLICATION supabase_realtime ADD TABLE public.unidades_live;

-- RLS opcional: solo usuarios autenticados pueden leer (recomendado si usas Auth)
-- ALTER TABLE public.unidades_live ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Operadores pueden leer unidades_live" ON public.unidades_live FOR SELECT TO authenticated USING (true);

-- Ejemplo de fila para probar (opcional)
-- INSERT INTO public.unidades_live (name, lat, lng, status) VALUES ('Patrulla MDQ-01', -37.994, -57.553, 'normal');
