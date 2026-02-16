-- Habilitar Realtime en incidents_log para que el dashboard reciba pánicos al instante.
-- Ejecutar en el SQL Editor de Supabase: https://supabase.com/dashboard/project/svpurpvbiujhcbiugrkh/sql
-- Si ya está en la publicación, puede aparecer "already in publication" (ignorar).

ALTER PUBLICATION supabase_realtime ADD TABLE public.incidents_log;
