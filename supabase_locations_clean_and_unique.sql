-- Ejecutar en el SQL Editor de Supabase:
-- https://supabase.com/dashboard/project/svpurpvbiujhcbiugrkh/sql

-- 1. Limpiamos la basura actual
DELETE FROM locations;

-- 2. Aseguramos que no se repitan nombres (si no está ya configurado)
--    Si la tabla no tiene columna unit_name, la creamos primero:
ALTER TABLE locations ADD COLUMN IF NOT EXISTS unit_name text;

-- Quitar constraint previo si existe (para no fallar al repetir el script)
ALTER TABLE locations DROP CONSTRAINT IF EXISTS unique_unit_name;

-- Constraint único en unit_name para que el UPSERT funcione
ALTER TABLE locations ADD CONSTRAINT unique_unit_name UNIQUE (unit_name);

-- NOTA: El dashboard actual usa user_id para locations. Si pasas a unit_name,
-- en dashboard.html cambia el payload a unit_name y onConflict: 'unit_name'.
