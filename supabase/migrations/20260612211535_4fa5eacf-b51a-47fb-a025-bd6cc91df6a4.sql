-- Cakto sales (webhook events)
CREATE TABLE public.cakto_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  transaction_id text,
  customer_name text,
  customer_email text,
  customer_phone text,
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'BRL',
  status text NOT NULL,
  payment_method text,
  raw_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cakto_sales TO authenticated;
GRANT ALL ON public.cakto_sales TO service_role;
ALTER TABLE public.cakto_sales ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage cakto_sales" ON public.cakto_sales
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX cakto_sales_occurred_at_idx ON public.cakto_sales (occurred_at DESC);
CREATE INDEX cakto_sales_status_idx ON public.cakto_sales (status);

-- Company receipts (Valen monthly)
CREATE TABLE public.company_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_no text NOT NULL UNIQUE,
  payer_name text NOT NULL DEFAULT 'VALEN SUPERMERCADO LTDA',
  payer_doc text NOT NULL DEFAULT '46.847.801/0002-79',
  amount numeric NOT NULL DEFAULT 29.90,
  reference_month date NOT NULL,
  payment_date date NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_receipts TO authenticated;
GRANT ALL ON public.company_receipts TO service_role;
ALTER TABLE public.company_receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage company_receipts" ON public.company_receipts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX company_receipts_reference_month_idx ON public.company_receipts (reference_month DESC);
CREATE TRIGGER company_receipts_touch BEFORE UPDATE ON public.company_receipts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();