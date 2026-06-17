
-- Tabela de eventos de funil para analytics interno
CREATE TABLE public.funnel_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  session_id TEXT,
  plan_id TEXT,
  plan_name TEXT,
  value NUMERIC(10,2),
  currency TEXT DEFAULT 'BRL',
  path TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.funnel_events TO anon, authenticated;
GRANT SELECT ON public.funnel_events TO authenticated;
GRANT ALL ON public.funnel_events TO service_role;

ALTER TABLE public.funnel_events ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode registrar eventos do próprio funil
CREATE POLICY "Anyone can insert funnel events"
ON public.funnel_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Apenas admins podem ler
CREATE POLICY "Admins can read funnel events"
ON public.funnel_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_funnel_events_created_at ON public.funnel_events (created_at DESC);
CREATE INDEX idx_funnel_events_event_name ON public.funnel_events (event_name);
