CREATE TABLE IF NOT EXISTS quality_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_type text NOT NULL,
  doc_no text NOT NULL,
  budget_year integer NOT NULL,
  month_name text,
  title text NOT NULL DEFAULT '',
  form_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  author_name text,
  reviewer_name text,
  reviewer_note text,
  reviewed_at timestamptz,
  signed_by text,
  signed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
)