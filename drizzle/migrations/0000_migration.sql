CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  job_title text,
  organization_type text,
  service_interest text,
  monthly_claim_volume text,
  current_rcm text,
  current_pms text,
  challenge text,
  message text
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.chat_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  organization_type text,
  need text,
  transcript jsonb NOT NULL DEFAULT '[]'::jsonb
);
GRANT ALL ON public.chat_enquiries TO service_role;
ALTER TABLE public.chat_enquiries ENABLE ROW LEVEL SECURITY;