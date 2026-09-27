import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronDown, FileText, Upload, X } from 'lucide-react';
import { CtaButton } from './cta';
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

const FORMATS = 'PDF, XLS/XLSX, JPG/PNG, DWG, DXF, STEP/STP';

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
            <span className="req" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
        {hint && <span className="field-hint">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`err-${htmlFor}`} className="field-error">
          <AlertCircle className="mt-[3px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Numbered group heading. Sits inside a <legend> so the group keeps its accessible name. */
function Section({ step, children }: { step: number; children: ReactNode }) {
  return (
    <span className="form-section">
      <span className="form-step" aria-hidden="true">{step}</span>
      {children}
    </span>
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
      <div className="panel p-8 text-center shadow-paper sm:p-10" role="status" aria-live="polite">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(var(--success-rgb),0.1)]">
          <CheckCircle2 className="h-7 w-7 text-success" aria-hidden="true" />
        </span>
        <h3 className="t-h3 mt-5 text-[22px]">Enquiry sent</h3>
        <p className="mx-auto mt-2 max-w-md text-[15.5px] leading-relaxed text-ink-soft">{status.message}</p>
        {status.reference && <p className="mt-3 font-mono text-[13px] text-ink-muted">Reference {status.reference}</p>}
        <CtaButton variant="secondary" size="md" className="mt-7" onClick={() => setStatus({ kind: 'idle' })}>
          Send another enquiry
        </CtaButton>
      </div>
    );
  }

  const sending = status.kind === 'sending';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="panel relative p-6 shadow-paper sm:p-8" aria-busy={sending} aria-labelledby="rfq-title">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-rule-soft pb-6">
        <div>
          <h2 id="rfq-title" className="t-h3 text-[22px]">Enquiry &amp; quotation request</h2>
          <p className="mt-1.5 text-[14px] text-ink-muted">
            Fields marked <span className="font-bold text-bronze-text">*</span> are required. Everything else helps us quote more precisely.
          </p>
        </div>
        {enquiryCodes && enquiryCodes.length > 0 && (
          <span className="chip">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {enquiryCodes.length} insert{enquiryCodes.length === 1 ? '' : 's'} included
          </span>
        )}
      </div>

      <fieldset className="mt-8">
        <legend className="w-full">
          <Section step={1}>Your details</Section>
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
            <input id="city" className="field" autoComplete="address-level2" placeholder="e.g. Rohtak, Haryana" {...a11y('city')} {...register('city')} />
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

      <fieldset className="mt-10 border-t border-rule-soft pt-8">
        <legend className="w-full">
          <Section step={2}>Your requirement</Section>
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
              <span>
                More technical detail <span className="font-normal text-ink-muted">(optional)</span>
              </span>
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

      <div className="mt-10 border-t border-rule-soft pt-8">
        <p id="attachment-label">
          <Section step={3}>
            Drawing, photo or specification <span className="text-[15px] font-normal text-ink-muted">(optional)</span>
          </Section>
        </p>
        <div
          className={`dropzone mt-5 ${dragging ? 'is-dragging' : ''} ${fileError ? 'has-error' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0] ?? null); }}
        >
          {file ? (
            <div className="flex flex-wrap items-center gap-3 px-4 py-3.5">
              <span className="icon-tile h-10 w-10 bg-surface-card"><FileText className="h-5 w-5" aria-hidden="true" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-[13.5px] font-semibold text-ink">{file.name}</p>
                <p className="text-[12.5px] text-ink-muted">{formatBytes(file.size)} · attached</p>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => fileInput.current?.click()} className="rounded-md px-2.5 py-1.5 text-[13.5px] font-semibold text-ink underline-offset-4 hover:underline">
                  Replace
                </button>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13.5px] font-semibold text-ink-muted transition-colors hover:bg-surface-subtle hover:text-ink"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              aria-describedby={`attachment-label attachment-hint${fileError ? ' attachment-error' : ''}`}
              className="group flex w-full flex-col items-center gap-2.5 rounded-xl px-4 py-8 text-center"
            >
              <span className="icon-tile bg-surface-card group-hover:border-accent-line group-hover:text-accent-ink"><Upload className="h-5 w-5" aria-hidden="true" /></span>
              <span className="text-[15px] text-ink">
                {dragging ? (
                  <span className="font-bold">Drop the file to attach it</span>
                ) : (
                  <>
                    <span className="font-bold text-accent-ink underline decoration-accent-line underline-offset-4">Choose a file</span> or drag it here
                  </>
                )}
              </span>
              <span id="attachment-hint" className="text-[13px] text-ink-muted">
                <span className="font-mono">{FORMATS}</span> · up to {Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))} MB
              </span>
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
        {fileError && (
          <p id="attachment-error" className="field-error" role="alert">
            <AlertCircle className="mt-[3px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {fileError}
          </p>
        )}
        <p className="mt-2 text-[12.5px] text-ink-muted">{UPLOAD_HINT}. One file per enquiry.</p>
      </div>

      {/* Spam trap — hidden from people and assistive technology, tempting to bots. */}
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="mt-8 rounded-xl border border-rule-soft bg-surface px-4 py-4">
        <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed text-ink-soft">
          <input type="checkbox" className="checkbox" {...a11y('consent')} {...register('consent')} />
          <span>
            I agree that Sreeraj Tools may use these details to reply to this enquiry.{' '}
            <span className="text-ink-muted">They won’t be used for anything else.</span>
            <span className="req" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </span>
        </label>
        {err('consent') && (
          <p id="err-consent" className="field-error">
            <AlertCircle className="mt-[3px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {err('consent')}
          </p>
        )}
      </div>

      {status.kind === 'failed' && (
        <div role="alert" className="alert-error mt-6">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-[14.5px] text-ink">{status.message}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-4 border-t border-rule-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-muted">
          How we handle enquiries: <Link href="/privacy" className="font-semibold text-ink-soft underline decoration-rule-strong underline-offset-2 hover:text-ink">privacy policy</Link>.
        </p>
        <CtaButton type="submit" arrow="tile" loading={sending} loadingLabel="Sending…" className="w-full sm:w-auto">
          Send Enquiry
        </CtaButton>
      </div>
    </form>
  );
}
