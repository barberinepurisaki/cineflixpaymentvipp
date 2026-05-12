-- ============ ROLES ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users see their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-grant admin to founder email on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'sr.deckson@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Backfill if user already exists
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE email = 'sr.deckson@gmail.com'
ON CONFLICT DO NOTHING;

-- ============ TIMESTAMP HELPER ============
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ SALES ============
CREATE TABLE public.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT NOT NULL UNIQUE DEFAULT ('CFX-' || upper(substr(md5(random()::text), 1, 8))),
  customer_name TEXT NOT NULL,
  customer_whatsapp TEXT,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_period TEXT,
  price NUMERIC(10,2) NOT NULL,
  addons JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC(10,2) NOT NULL,
  access_username TEXT,
  access_password TEXT,
  server_url TEXT,
  app_name TEXT,
  app_instructions TEXT,
  status TEXT NOT NULL DEFAULT 'pago',
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage sales"
ON public.sales FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_sales_touch BEFORE UPDATE ON public.sales
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ CATALOG: PLANS ============
CREATE TABLE public.catalog_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  period TEXT NOT NULL,
  icon TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  discount TEXT,
  payment_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.catalog_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Plans are public" ON public.catalog_plans FOR SELECT USING (true);
CREATE POLICY "Admins manage plans" ON public.catalog_plans FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_plans_touch BEFORE UPDATE ON public.catalog_plans
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ CATALOG: UPSELLS ============
CREATE TABLE public.catalog_upsells (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.catalog_upsells ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Upsells are public" ON public.catalog_upsells FOR SELECT USING (true);
CREATE POLICY "Admins manage upsells" ON public.catalog_upsells FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_upsells_touch BEFORE UPDATE ON public.catalog_upsells
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ CATALOG: MOVIES (custom highlights) ============
CREATE TABLE public.catalog_movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  year INT,
  duration TEXT,
  rating NUMERIC(3,1),
  description TEXT,
  trailer_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.catalog_movies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Movies are public" ON public.catalog_movies FOR SELECT USING (true);
CREATE POLICY "Admins manage movies" ON public.catalog_movies FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_movies_touch BEFORE UPDATE ON public.catalog_movies
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ SEED PLANS & UPSELLS ============
INSERT INTO public.catalog_plans (id, name, price, period, icon, features, featured, discount, payment_url, sort_order) VALUES
('mensal','PLANO MENSAL',29.90,'/mês','📱','["30 dias de acesso completo","Todos os filmes e séries","1 tela simultânea","Qualidade Full HD"]'::jsonb,false,NULL,'https://pay.cakto.com.br/kmz4m8v_878535',1),
('trimestral','PLANO TRIMESTRAL',75.90,'/trimestre','💎','["90 dias de acesso completo","Todos os filmes e séries","2 telas simultâneas","Qualidade 4K Ultra HD","Download offline"]'::jsonb,true,'ECONOMIZE 20%','https://pay.cakto.com.br/3f3gp73_878540',2),
('anual','PLANO ANUAL VIP',300.00,'/ano','👑','["365 dias de acesso completo","Todos os filmes e séries","4 telas simultâneas","Qualidade 4K Ultra HD","Download offline ilimitado","Acesso antecipado a lançamentos"]'::jsonb,false,'MELHOR OFERTA','https://pay.cakto.com.br/yxqbt2g_878541',3),
('apk','APK VITALÍCIO',97.90,'único','🤖','["Pagamento único — sem mensalidade","Compatível com Android","Sem senhas e sem travamentos","Zero anúncios","Atualizações futuras de lançamentos","Garantia de 360 dias"]'::jsonb,false,'VITALÍCIO','https://pay.cakto.com.br/n8rrwfq_735392',4);

INSERT INTO public.catalog_upsells (id, name, description, price, sort_order) VALUES
('canal_adulto','🔞 Canal Adulto','Conteúdo adulto exclusivo +18',8.99,1),
('acesso_extra','+1 Acesso Extra','Assista em 2 telas simultâneas',9.90,2),
('adultos_herois','Pacote Adultos + Heróis 2025','Conteúdo exclusivo + lançamentos',7.90,3),
('combo_completo','COMBO COMPLETO','Todos os adicionais juntos',14.90,4);
