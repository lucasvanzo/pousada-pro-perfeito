
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_first_admin() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "anyone create reservation request" ON public.reservations;
CREATE POLICY "anyone create reservation request" ON public.reservations FOR INSERT
  WITH CHECK (
    length(guest_name) BETWEEN 2 AND 120
    AND check_in < check_out
    AND status = 'pending'
  );

DROP POLICY IF EXISTS "anyone submit testimonial" ON public.testimonials;
CREATE POLICY "anyone submit testimonial" ON public.testimonials FOR INSERT
  WITH CHECK (
    approved = false
    AND length(name) BETWEEN 2 AND 80
    AND length(text) BETWEEN 5 AND 2000
    AND rating BETWEEN 1 AND 5
  );
