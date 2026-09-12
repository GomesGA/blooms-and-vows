CREATE TABLE public.rsvps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name text NOT NULL UNIQUE,
  attending boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.rsvps TO anon;
GRANT SELECT, INSERT, UPDATE ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rsvps" ON public.rsvps FOR SELECT USING (true);
CREATE POLICY "Anyone can create rsvps" ON public.rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update rsvps" ON public.rsvps FOR UPDATE USING (true) WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER rsvps_set_updated_at BEFORE UPDATE ON public.rsvps
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();