import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { categories, type CategoryId, type Product } from '../../../shared/catalog';

/**
 * A multi-item enquiry list. Buyers add inserts while browsing and send one
 * quotation request for all of them. Stored per browser in localStorage; it
 * never leaves the device until the enquiry form is submitted.
 */

export interface EnquiryItem {
  code: string;
  family: string;
  category: CategoryId;
}

interface EnquiryApi {
  items: EnquiryItem[];
  has: (code: string) => boolean;
  toggle: (product: Product) => void;
  remove: (code: string) => void;
  clear: () => void;
}

const KEY = 'shreeraj.enquiry.v1';
const MAX = 60;
const VALID = new Set<string>(categories.map((c) => c.id));

function load(): EnquiryItem[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x): x is EnquiryItem => x && typeof x.code === 'string' && typeof x.family === 'string' && VALID.has(x.category))
      .slice(0, MAX);
  } catch {
    return [];
  }
}

const Ctx = createContext<EnquiryApi | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<EnquiryItem[]>(() => (typeof window === 'undefined' ? [] : load()));

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — list still works for this visit */
    }
  }, [items]);

  // Keep several open tabs in step.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setItems(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const has = useCallback((code: string) => items.some((i) => i.code === code), [items]);

  const toggle = useCallback((p: Product) => {
    setItems((cur) => {
      if (cur.some((i) => i.code === p.code)) return cur.filter((i) => i.code !== p.code);
      if (cur.length >= MAX) return cur;
      return [...cur, { code: p.code, family: p.family, category: p.category }];
    });
  }, []);

  const remove = useCallback((code: string) => setItems((cur) => cur.filter((i) => i.code !== code)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({ items, has, toggle, remove, clear }), [items, has, toggle, remove, clear]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEnquiry(): EnquiryApi {
  const value = useContext(Ctx);
  if (!value) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return value;
}
