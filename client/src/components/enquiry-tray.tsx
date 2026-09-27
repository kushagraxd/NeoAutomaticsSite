import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronUp, Trash2, X } from 'lucide-react';
import InsertRender from './insert-render';
import { CtaLink } from './cta';
import { useEnquiry } from '../lib/enquiry-list';
import { categoryById } from '../../../shared/catalog';

/** Floating summary of the enquiry list. Hidden on the quote page, which shows the list inline. */
export default function EnquiryTray() {
  const { items, remove, clear } = useEnquiry();
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!items.length) setOpen(false);
  }, [items.length]);

  if (!items.length || location === '/quote' || location === '/contact') return null;

  return (
    <>
      {/* Spacer so the last content on the page can scroll clear of the floating tray. */}
      <div aria-hidden="true" className="h-24" />
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:px-4">
        <div className="pointer-events-auto w-full max-w-xl animate-rise overflow-hidden rounded-2xl border border-rule bg-surface-card text-ink shadow-raised">
          {open && (
            <div id="enquiry-tray-list" className="border-b border-rule">
              <div className="flex items-center justify-between px-5 pt-4">
                <p className="t-label">Your enquiry list</p>
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-1.5 rounded-md text-[13px] font-semibold text-ink-muted transition-colors hover:text-ink"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Clear all
                </button>
              </div>
              <ul className="max-h-64 overflow-y-auto px-3 py-2">
                {items.map((i) => (
                  <li key={i.code} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface">
                    <span className="product-stage flex h-10 w-12 shrink-0 items-center justify-center rounded-md">
                      <InsertRender code={i.code} family={i.family} category={i.category} className="h-8 w-auto" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-[13.5px] font-semibold">{i.code}</p>
                      <p className="text-[12.5px] text-ink-muted">{categoryById(i.category)?.short}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(i.code)}
                      aria-label={`Remove ${i.code}`}
                      className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-3 p-2.5 pl-4">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="enquiry-tray-list"
              className="flex min-w-0 flex-1 items-center gap-3 rounded-md text-left"
            >
              <span className="hidden -space-x-3 sm:flex" aria-hidden="true">
                {items.slice(0, 3).map((i) => (
                  <span key={i.code} className="flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-surface">
                    <InsertRender code={i.code} family={i.family} category={i.category} className="h-7 w-auto" />
                  </span>
                ))}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14.5px] font-bold">
                  {items.length} insert{items.length === 1 ? '' : 's'} in your enquiry
                </span>
                <span className="block text-[12.5px] text-ink-muted">{open ? 'Hide list' : 'Review list'}</span>
              </span>
              <ChevronUp className={`ml-auto h-4 w-4 shrink-0 text-ink-muted transition-transform ${open ? '' : 'rotate-180'}`} aria-hidden="true" />
            </button>
            <CtaLink href="/contact#enquiry" size="sm" arrow="inline">
              Request quote
            </CtaLink>
          </div>
        </div>
      </div>
    </>
  );
}
