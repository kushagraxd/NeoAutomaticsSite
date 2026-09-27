/**
 * Real product photography, keyed by product code. Empty until photographs of
 * our own stock exist — every product shows its ISO illustration meanwhile.
 *
 * To add one: put the file in client/public/products/ and register it here as
 * `TNMG160404: '/products/tnmg160404.jpg'`. Never use supplier, catalogue or
 * competitor imagery.
 */
const PRODUCT_IMAGES: Record<string, string> = {};

export function productImage(code: string): string | null {
  return PRODUCT_IMAGES[code.toUpperCase()] ?? null;
}
