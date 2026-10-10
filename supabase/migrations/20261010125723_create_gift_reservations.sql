CREATE TABLE public.gift_reservations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gift_id integer NOT NULL UNIQUE,
  guest_name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.gift_reservations TO anon;
GRANT SELECT, INSERT, UPDATE ON public.gift_reservations TO authenticated;
GRANT ALL ON public.gift_reservations TO service_role;

ALTER TABLE public.gift_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gift reservations" ON public.gift_reservations FOR SELECT USING (true);
CREATE POLICY "Anyone can create gift reservations" ON public.gift_reservations FOR INSERT WITH CHECK (true);
