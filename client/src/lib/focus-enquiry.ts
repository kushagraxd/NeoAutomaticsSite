/**
 * Brings the enquiry form into view. Focuses the first field only on devices
 * with a fine pointer, so phones don't throw up the keyboard unasked.
 */
export function focusEnquiryForm(): boolean {
  const target = document.getElementById('enquiry');
  if (!target) return false;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  if (window.matchMedia('(pointer: fine)').matches) {
    window.setTimeout(() => document.getElementById('name')?.focus({ preventScroll: true }), reduced ? 0 : 450);
  }
  return true;
}
