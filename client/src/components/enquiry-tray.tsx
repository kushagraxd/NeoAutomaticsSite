import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, ChevronUp, Trash2, X } from 'lucide-react';
import InsertRender from './insert-render';
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
      <div className="pointer-events-auto w-full max-w-xl animate-rise overflow-hidden rounded-2xl border border-night-line bg-[rgba(var(--night-rgb),0.94)] text-night-ink shadow-glow backdrop-blur-xl">
        {open && (
          <div className="border-b border-night-line">
            <div className="flex items-center justify-between px-5 pt-4">
              <p className="label text-night-muted">Your enquiry list</p>
              <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 text-[12.5px] text-night-muted transition-colors hover:text-accent">
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> Clear all
              </button>
            </div>
            <ul className="max-h-64 overflow-y-auto px-3 py-2">
              {items.map((i) => (
                <li key={i.code} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[.04]">
                  <InsertRender code={i.code} family={i.family} category={i.category} className="h-9 w-auto shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[13.5px] font-medium">{i.code}</p>
                    <p className="text-[12px] text-night-muted">{categoryById(i.category)?.short}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(i.code)}
                    aria-label={`Remove ${i.code}`}
                    className="rounded-md p-1.5 text-night-muted transition-colors hover:bg-white/[.06] hover:text-night-ink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-3 p-2.5 pl-4">
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-3 text-left">
            <span className="hidden -space-x-3 sm:flex" aria-hidden="true">
              {items.slice(0, 3).map((i) => (
                <span key={i.code} className="flex h-9 w-9 items-center justify-center rounded-full border border-night-line bg-night-soft">
                  <InsertRender code={i.code} family={i.family} category={i.category} className="h-7 w-auto" />
                </span>
              ))}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[14.5px] font-semibold">
                {items.length} insert{items.length === 1 ? '' : 's'} in your enquiry
              </span>
              <span className="block text-[12.5px] text-night-muted">{open ? 'Hide list' : 'Review list'}</span>
            </span>
            <ChevronUp className={`ml-auto h-4 w-4 shrink-0 text-night-muted transition-transform ${open ? '' : 'rotate-180'}`} aria-hidden="true" />
          </button>
          <Link
            href="/contact#enquiry"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-brand-hover active:scale-[.98]"
          >
            Request quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
