-- Tabla de perfiles (Recruitment). Ejecutar en SQL Editor de Supabase.
-- Al registrarse, el frontend hace upsert con role 'UNIDAD_MOVIL'.

CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    role text NOT NULL DEFAULT 'UNIDAD_MOVIL',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Permitir que cada usuario inserte/actualice su propio perfil (tras signUp)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Opcional: permitir que operadores (role distinto) lean otros perfiles si lo necesitas después.
-- CREATE POLICY "Operators read all" ON public.profiles FOR SELECT USING (
--   (SELECT (raw_user_meta_data->>'role')::text FROM auth.users WHERE id = auth.uid()) = 'OPERADOR'
-- );
