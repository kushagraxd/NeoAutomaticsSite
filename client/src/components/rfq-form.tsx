import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, CheckCircle2, AlertTriangle, Loader2, X } from 'lucide-react';
import { rfqSchema, type RfqInput, MAX_UPLOAD_BYTES, UPLOAD_HINT, ACCEPTED_UPLOAD_EXT } from '../../../shared/rfq';
import { categories } from '../../../shared/catalog';

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; reference: string; message: string }
  | { kind: 'failed'; message: string };

const field =
  'w-full border border-rule bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-muted/70 ' +
  'focus:border-accent-strong focus:outline-none focus:ring-1 focus:ring-accent-strong';

const labelCls = 'mb-1.5 block text-[14px] font-medium text-ink';

export interface RfqFormProps {
  /** Pre-selects the category, e.g. when opened from a product page. */
  defaultCategory?: RfqInput['productCategory'];
  /** Pre-fills the product code, e.g. from a product detail page. */
  defaultCode?: string;
}

export default function RfqForm({ defaultCategory, defaultCode }: RfqFormProps) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RfqInput>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      preferredContact: 'email',
      productCategory: defaultCategory ?? ('turning' as RfqInput['productCategory']),
      productCode: defaultCode ?? '',
    },
  });

  const pickFile = (f: File | null) => {
    setFileError(null);
    if (!f) return setFile(null);
    const ext = `.${f.name.split('.').pop()?.toLowerCase() ?? ''}`;
    if (!ACCEPTED_UPLOAD_EXT.includes(ext)) {
      setFileError('That file type is not supported. Attach a PDF, image, spreadsheet or CAD drawing.');
      return;
    }
    if (f.size > MAX_UPLOAD_BYTES) {
      setFileError('That file is larger than 10 MB.');
      return;
    }
    setFile(f);
  };

  const onSubmit = async (values: RfqInput) => {
    setStatus({ kind: 'sending' });
    try {
      const body = new FormData();
      Object.entries(values).forEach(([k, v]) => body.append(k, String(v ?? '')));
      if (file) body.append('attachment', file);

      const res = await fetch('/api/rfq', { method: 'POST', body });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus({ kind: 'sent', reference: json.reference, message: json.message });
        reset();
        setFile(null);
        return;
      }
      setStatus({
        kind: 'failed',
        message: json.message ?? 'We could not send your enquiry just now. Please try again shortly.',
      });
    } catch {
      setStatus({
        kind: 'failed',
        message: 'We could not reach the server. Please check your connection and try again.',
      });
    }
  };

  if (status.kind === 'sent') {
    return (
      <div className="border border-rule bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-11 w-11 text-accent-ink" aria-hidden="true" />
        <h3 className="mb-2 text-2xl text-ink">Enquiry sent</h3>
        <p className="mx-auto mb-1 max-w-md text-[15px] text-ink-soft">{status.message}</p>
        <p className="mb-6 font-mono text-[13px] text-ink-muted">Reference {status.reference}</p>
        <button type="button" className="btn-outline" onClick={() => setStatus({ kind: 'idle' })}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="border border-rule bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Name <span className="text-accent-ink">*</span></label>
          <input id="name" className={field} autoComplete="name" {...register('name')} />
          {errors.name && <p className="mt-1 text-[13px] text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>Company <span className="text-accent-ink">*</span></label>
          <input id="company" className={field} autoComplete="organization" {...register('company')} />
          {errors.company && <p className="mt-1 text-[13px] text-destructive">{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email <span className="text-accent-ink">*</span></label>
          <input id="email" type="email" className={field} autoComplete="email" {...register('email')} />
          {errors.email && <p className="mt-1 text-[13px] text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone / WhatsApp <span className="text-accent-ink">*</span></label>
          <input id="phone" type="tel" className={field} autoComplete="tel" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-[13px] text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelCls}>Preferred way to reach you</legend>
        <div className="flex flex-wrap gap-4">
          {(['email', 'phone', 'whatsapp'] as const).map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-2 text-[15px] text-ink-soft">
              <input type="radio" value={m} className="accent-[var(--accent-strong)]" {...register('preferredContact')} />
              <span className="capitalize">{m}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <hr className="my-7 border-rule" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="productCategory" className={labelCls}>Product category <span className="text-accent-ink">*</span></label>
          <select id="productCategory" className={field} {...register('productCategory')}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.productCategory && <p className="mt-1 text-[13px] text-destructive">{errors.productCategory.message}</p>}
        </div>
        <div>
          <label htmlFor="productCode" className={labelCls}>
            Product code <span className="font-normal text-ink-muted">(if known)</span>
          </label>
          <input id="productCode" className={`${field} font-mono`} placeholder="e.g. TNMG160404-MA" {...register('productCode')} />
        </div>
        <div>
          <label htmlFor="gradeOrCoating" className={labelCls}>
            Grade or coating <span className="font-normal text-ink-muted">(if known)</span>
          </label>
          <input id="gradeOrCoating" className={field} {...register('gradeOrCoating')} />
        </div>
        <div>
          <label htmlFor="workpieceMaterial" className={labelCls}>
            Workpiece material or application <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input id="workpieceMaterial" className={field} placeholder="e.g. mild steel, cast iron" {...register('workpieceMaterial')} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="quantity" className={labelCls}>
            Required quantity <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input id="quantity" className={field} placeholder="e.g. 500 pcs, or monthly requirement" {...register('quantity')} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="requirement" className={labelCls}>
          Describe your requirement <span className="text-accent-ink">*</span>
        </label>
        <textarea id="requirement" rows={5} className={field} {...register('requirement')} />
        {errors.requirement && <p className="mt-1 text-[13px] text-destructive">{errors.requirement.message}</p>}
      </div>

      <div className="mt-5">
        <span className={labelCls}>Drawing or specification <span className="font-normal text-ink-muted">(optional)</span></span>
        {file ? (
          <div className="flex items-center justify-between border border-rule bg-surface-subtle px-3.5 py-2.5">
            <span className="truncate font-mono text-[13px] text-ink">{file.name}</span>
            <button type="button" onClick={() => setFile(null)} className="ml-3 p-1 text-ink-muted hover:text-ink" aria-label="Remove file">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3 border border-dashed border-rule bg-surface-subtle px-4 py-5 text-[14px] text-ink-muted hover:border-ink">
            <Upload className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>
              <span className="font-medium text-ink">Attach a file</span> — {UPLOAD_HINT}
            </span>
            <input
              type="file"
              className="sr-only"
              accept={ACCEPTED_UPLOAD_EXT.join(',')}
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
            />
          </label>
        )}
        {fileError && <p className="mt-1 text-[13px] text-destructive">{fileError}</p>}
      </div>

      {status.kind === 'failed' && (
        <div role="alert" className="mt-6 flex gap-3 border border-destructive/30 bg-[#fdf2f1] p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-[14px] text-ink-soft">{status.message}</p>
        </div>
      )}

      <button type="submit" className="btn-primary mt-7 w-full sm:w-auto" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          'Send Enquiry'
        )}
      </button>
      <p className="mt-3 text-[13px] text-ink-muted">
        We reply with pricing and availability. Your details are used only to answer this enquiry.
      </p>
    </form>
  );
}
