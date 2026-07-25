-- Explicit deny policies for writes on public.site_content.
-- Writes go through the server function using the service role, which bypasses RLS.
-- These explicit restrictive policies make the deny-by-default behavior auditable.
CREATE POLICY "Deny inserts from clients"
  ON public.site_content
  AS RESTRICTIVE
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "Deny updates from clients"
  ON public.site_content
  AS RESTRICTIVE
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny deletes from clients"
  ON public.site_content
  AS RESTRICTIVE
  FOR DELETE
  TO anon, authenticated
  USING (false);