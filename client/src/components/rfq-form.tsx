import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, CheckCircle2, ChevronDown, FileText, Loader2, Upload, X } from 'lucide-react';
import {
  rfqSchema,
  sourcingBases,
  SOURCING_LABELS,
  MAX_UPLOAD_BYTES,
  UPLOAD_HINT,
  ACCEPTED_UPLOAD_EXT,
  type RfqInput,
  type SourcingBasis,
} from '../../../shared/rfq';
import { categories } from '../../../shared/catalog';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; reference: string; message: string }
  | { kind: 'failed'; message: string };

type FieldName = keyof RfqInput;

/** Field names the server may report validation errors against. */
const SERVER_FIELDS = new Set<string>([
  'name', 'company', 'email', 'phone', 'city', 'preferredContact', 'productCategory', 'productCode',
  'gradeOrCoating', 'workpieceMaterial', 'quantity', 'requirement', 'sourcingBasis', 'consent',
]);

const REPLY_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone call' },
  { value: 'whatsapp', label: 'WhatsApp' },
] as const;

const formatBytes = (n: number) =>
  n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;

function Field({
  label, htmlFor, required, hint, error, className = '', children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {required && (
          <>
            <span className="ml-0.5 text-gold" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
        {hint && <span className="ml-1.5 font-normal text-ink-muted">{hint}</span>}
      </label>
      {children}
      {error && <p id={`err-${htmlFor}`} className="field-error">{error}</p>}
    </div>
  );
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
    </div>
  );
}

export interface RfqFormProps {
  /** Pre-selects the category, e.g. from a product page or a category link. */
  defaultCategory?: RfqInput['productCategory'];
  /** Pre-fills the product code. */
  defaultCode?: string;
  /** Codes from the enquiry list, sent with the message. */
  enquiryCodes?: string[];
  /** Pre-fills the requirement text. */
  defaultRequirement?: string;
  /** Pre-selects what the buyer is sharing, e.g. from a Custom Sourcing card. */
  defaultSourcingBasis?: SourcingBasis;
  /** Called only after the server confirms delivery. */
  onSent?: () => void;
}

export default function RfqForm({
  defaultCategory, defaultCode, enquiryCodes, defaultRequirement, defaultSourcingBasis, onSent,
}: RfqFormProps) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RfqInput>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      preferredContact: 'email',
      productCategory: defaultCategory ?? ('turning' as RfqInput['productCategory']),
      productCode: defaultCode ?? '',
      requirement: defaultRequirement ?? '',
      sourcingBasis: defaultSourcingBasis ?? '',
      consent: false,
    },
  });

  const err = (k: FieldName) => errors[k]?.message as string | undefined;
  const a11y = (k: FieldName) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `err-${String(k)}` : undefined,
  });

  const pickFile = (f: File | null) => {
    setFileError(null);
    if (!f) return;
    const ext = `.${f.name.split('.').pop()?.toLowerCase() ?? ''}`;
    if (!ACCEPTED_UPLOAD_EXT.includes(ext)) {
      setFileError('That file type isn’t supported. Attach a PDF, spreadsheet, JPG/PNG image, or a DWG, DXF or STEP drawing.');
      return;
    }
    if (f.size > MAX_UPLOAD_BYTES) {
      setFileError('That file is larger than 10 MB. Please attach a smaller file.');
      return;
    }
    setFile(f);
  };

  const onSubmit = async (values: RfqInput) => {
    setStatus({ kind: 'sending' });
    try {
      const body = new FormData();
      Object.entries(values).forEach(([k, v]) => body.append(k, v === undefined || v === null ? '' : String(v)));
      if (enquiryCodes?.length) body.set('enquiryList', enquiryCodes.join(', '));
      body.set('website', honeypot);
      body.set('formElapsedMs', String(Date.now() - startedAt.current));
      if (file) body.append('attachment', file);

      const res = await fetch('/api/rfq', { method: 'POST', body });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        message?: string;
        errors?: Array<{ field: string; message: string }>;
      };

      if (res.ok && json.ok) {
        setStatus({ kind: 'sent', reference: json.reference ?? '', message: json.message ?? 'Your enquiry has been sent.' });
        reset();
        setFile(null);
        startedAt.current = Date.now();
        onSent?.();
        return;
      }

      json.errors?.forEach((e) => {
        if (SERVER_FIELDS.has(e.field)) setError(e.field as FieldName, { type: 'server', message: e.message });
      });
      // Nothing is cleared on failure — the visitor's details stay in the form.
      setStatus({
        kind: 'failed',
        message: json.message ?? 'We could not send your enquiry just now. Your details are still in the form — please try again shortly.',
      });
    } catch {
      setStatus({
        kind: 'failed',
        message: 'We could not reach the server. Check your connection — your details are still in the form.',
      });
    }
  };

  if (status.kind === 'sent') {
    return (
      <div className="card p-8 text-center sm:p-10" role="status" aria-live="polite">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(var(--success-rgb),0.14)]">
          <CheckCircle2 className="h-7 w-7 text-success" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-ink">Enquiry sent</h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">{status.message}</p>
        {status.reference && <p className="mt-3 font-mono text-[13px] text-ink-muted">Reference {status.reference}</p>}
        <button type="button" className="btn-outline mt-7" onClick={() => setStatus({ kind: 'idle' })}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card relative p-6 sm:p-8" aria-busy={sending}>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-rule pb-6">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">Enquiry &amp; quotation request</h2>
          <p className="mt-1 text-[14px] text-ink-muted">
            Fields marked <span className="text-gold">*</span> are required. We reply with pricing and availability.
          </p>
        </div>
        {enquiryCodes && enquiryCodes.length > 0 && (
          <span className="chip">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {enquiryCodes.length} insert{enquiryCodes.length === 1 ? '' : 's'} included
          </span>
        )}
      </div>

      <fieldset className="mt-7">
        <legend className="form-section">Your details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name" required error={err('name')}>
            <input id="name" className="field" autoComplete="name" {...a11y('name')} {...register('name')} />
          </Field>
          <Field label="Company name" htmlFor="company" required error={err('company')}>
            <input id="company" className="field" autoComplete="organization" {...a11y('company')} {...register('company')} />
          </Field>
          <Field label="Work email" htmlFor="email" required error={err('email')}>
            <input id="email" type="email" className="field" autoComplete="email" inputMode="email" {...a11y('email')} {...register('email')} />
          </Field>
          <Field label="Phone / WhatsApp" htmlFor="phone" required error={err('phone')}>
            <input id="phone" type="tel" className="field" autoComplete="tel" inputMode="tel" {...a11y('phone')} {...register('phone')} />
          </Field>
          <Field label="City or location" htmlFor="city" hint="(optional)" error={err('city')}>
            <input id="city" className="field" autoComplete="address-level2" placeholder="e.g. Rohtak, Haryana" {...register('city')} />
          </Field>
          <fieldset>
            <legend className="field-label">Preferred reply</legend>
            <div className="flex flex-wrap gap-2">
              {REPLY_OPTIONS.map((o) => (
                <label key={o.value} className="choice">
                  <input type="radio" value={o.value} className="peer sr-only" {...register('preferredContact')} />
                  <span className="choice-box">{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      <fieldset className="mt-9">
        <legend className="form-section">Your requirement</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field label="Product category" htmlFor="productCategory" required error={err('productCategory')}>
            <SelectWrap>
              <select id="productCategory" className="field appearance-none pr-10" {...a11y('productCategory')} {...register('productCategory')}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </SelectWrap>
          </Field>
          <Field label="What are you sharing?" htmlFor="sourcingBasis" hint="(optional)">
            <SelectWrap>
              <select id="sourcingBasis" className="field appearance-none pr-10" {...register('sourcingBasis')}>
                <option value="">Not specified</option>
                {sourcingBases.map((b) => (
                  <option key={b} value={b}>{SOURCING_LABELS[b]}</option>
                ))}
              </select>
            </SelectWrap>
          </Field>
          <Field label="Product code" htmlFor="productCode" hint="(if known)">
            <input id="productCode" className="field font-mono" placeholder="e.g. TNMG160408-MA" autoComplete="off" spellCheck={false} {...register('productCode')} />
          </Field>
          <Field label="Quantity" htmlFor="quantity" hint="(if known)">
            <input id="quantity" className="field" placeholder="e.g. 500 pcs, or a monthly requirement" {...register('quantity')} />
          </Field>
          <Field label="Requirement or message" htmlFor="requirement" required error={err('requirement')} className="sm:col-span-2">
            <textarea
              id="requirement"
              rows={5}
              className="field resize-y"
              placeholder="Operation, workpiece material, the insert you use today — anything that helps us quote."
              {...a11y('requirement')}
              {...register('requirement')}
            />
          </Field>

          <details className="disclosure sm:col-span-2">
            <summary>
              More technical detail <span className="font-normal text-ink-muted">(optional)</span>
              <ChevronDown className="disclosure-icon h-4 w-4" aria-hidden="true" />
            </summary>
            <div className="grid gap-5 pt-5 sm:grid-cols-2">
              <Field label="Grade or coating" htmlFor="gradeOrCoating" hint="(if known)">
                <input id="gradeOrCoating" className="field" {...register('gradeOrCoating')} />
              </Field>
              <Field label="Workpiece material" htmlFor="workpieceMaterial" hint="(if known)">
                <input id="workpieceMaterial" className="field" placeholder="e.g. mild steel, cast iron, stainless" {...register('workpieceMaterial')} />
              </Field>
            </div>
          </details>
        </div>
      </fieldset>

      <div className="mt-9">
        <p className="form-section" id="attachment-label">Drawing, photo or specification <span className="font-normal normal-case tracking-normal text-ink-muted">(optional)</span></p>
        <div
          className={`dropzone mt-4 ${dragging ? 'is-dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0] ?? null); }}
        >
          {file ? (
            <div className="flex items-center gap-3 px-4 py-3.5">
              <span className="icon-badge h-10 w-10"><FileText className="h-5 w-5" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[13.5px] text-ink">{file.name}</p>
                <p className="text-[12.5px] text-ink-muted">{formatBytes(file.size)}</p>
              </div>
              <button type="button" onClick={() => fileInput.current?.click()} className="text-[13.5px] font-medium text-brand-bright hover:underline">
                Replace
              </button>
              <button type="button" onClick={() => setFile(null)} className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-panel hover:text-ink" aria-label={`Remove ${file.name}`}>
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              aria-describedby="attachment-label attachment-hint"
              className="flex w-full flex-col items-center gap-2 rounded-xl px-4 py-8 text-center"
            >
              <span className="icon-badge"><Upload className="h-5 w-5" aria-hidden="true" /></span>
              <span className="text-[15px] text-ink"><span className="font-semibold text-brand-bright">Choose a file</span> or drag it here</span>
              <span id="attachment-hint" className="text-[13px] text-ink-muted">{UPLOAD_HINT} · PDF, XLS/XLSX, JPG/PNG, DWG, DXF, STEP/STP</span>
            </button>
          )}
          <input
            ref={fileInput}
            type="file"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            accept={ACCEPTED_UPLOAD_EXT.join(',')}
            onChange={(e) => { pickFile(e.target.files?.[0] ?? null); e.target.value = ''; }}
          />
        </div>
        {fileError && <p className="field-error" role="alert">{fileError}</p>}
      </div>

      {/* Spam trap — hidden from people and assistive technology, tempting to bots. */}
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed text-ink-soft">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--brand)]" {...a11y('consent')} {...register('consent')} />
          <span>
            I agree that ShreeRaj Tools may use these details to reply to this enquiry.{' '}
            <span className="text-ink-muted">They won’t be used for anything else.</span>
            <span className="ml-0.5 text-gold" aria-hidden="true">*</span>
          </span>
        </label>
        {err('consent') && <p id="err-consent" className="field-error">{err('consent')}</p>}
      </div>

      {status.kind === 'failed' && (
        <div role="alert" className="alert-error mt-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-[14.5px] text-ink">{status.message}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-muted">
          Read how we handle enquiries in our <Link href="/privacy" className="text-ink-soft underline decoration-rule-strong underline-offset-2 hover:text-ink">privacy policy</Link>.
        </p>
        <button type="submit" className="btn-primary btn-lg" disabled={sending}>
          {sending ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            'Send enquiry'
          )}
        </button>
      </div>
    </form>
  );
}
