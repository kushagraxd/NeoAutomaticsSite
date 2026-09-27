import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Loader2 } from 'lucide-react';

/*
 * The site's one button system. Styles live in index.css (.btn-*); this file
 * only assembles the classes and the arrow, so every page renders actions the
 * same way.
 *
 *   primary            royal plum → amethyst gradient, champagne arrow tile
 *   secondary          plum outline → deep aubergine fill, 1 px lift
 *   primary-inverse    for dark contrast bands: amethyst
 *   secondary-inverse  for dark contrast bands: outlined ivory → lavender
 */

export type CtaVariant = 'primary' | 'secondary' | 'primary-inverse' | 'secondary-inverse';
export type CtaSize = 'lg' | 'md' | 'sm' | 'xs';

interface CtaStyleProps {
  variant?: CtaVariant;
  size?: CtaSize;
  /**
   * `tile` — arrow in a square tile, flush right (primary actions).
   * `inline` — a plain arrow after the label.
   */
  arrow?: 'tile' | 'inline';
  className?: string;
  children: ReactNode;
}

// Written out in full so Tailwind's content scan keeps these classes in the build.
const VARIANT_CLASS: Record<CtaVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'primary-inverse': 'btn-primary-inverse',
  'secondary-inverse': 'btn-secondary-inverse',
};
const SIZE_CLASS: Record<CtaSize, string> = { lg: 'btn-lg', md: 'btn-md', sm: 'btn-sm', xs: 'btn-xs' };

export function ctaClass({ variant = 'primary', size = 'lg', arrow, className = '' }: Omit<CtaStyleProps, 'children'>): string {
  return ['btn', VARIANT_CLASS[variant], SIZE_CLASS[size], arrow === 'tile' ? 'btn-with-tile' : '', className].filter(Boolean).join(' ');
}

function Contents({ arrow, size, children }: Pick<CtaStyleProps, 'arrow' | 'size' | 'children'>) {
  const icon = size === 'xs' || size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]';
  return (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow === 'tile' && (
        <span className="btn-tile" aria-hidden="true">
          <ArrowRight className={icon} />
        </span>
      )}
      {arrow === 'inline' && <ArrowRight className={`btn-arrow ${icon}`} aria-hidden="true" />}
    </>
  );
}

export interface CtaLinkProps extends CtaStyleProps {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
  /** Plain anchor for in-page targets (e.g. "#enquire"), so the browser handles the jump. */
  native?: boolean;
}

export function CtaLink({ href, onClick, native, variant, size = 'lg', arrow, className, children, ...rest }: CtaLinkProps) {
  const cls = ctaClass({ variant, size, arrow, className });
  const body = (
    <Contents arrow={arrow} size={size}>
      {children}
    </Contents>
  );
  return native ? (
    <a href={href} onClick={onClick} className={cls} {...rest}>
      {body}
    </a>
  ) : (
    <Link href={href} onClick={onClick} className={cls} {...rest}>
      {body}
    </Link>
  );
}

export interface CtaButtonProps extends CtaStyleProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  /** Shows a spinner and blocks repeat clicks while an action is in progress. */
  loading?: boolean;
  /** Label shown while loading, e.g. "Sending…". */
  loadingLabel?: ReactNode;
}

export function CtaButton({ variant, size = 'lg', arrow, className, children, type = 'button', loading, loadingLabel, disabled, ...rest }: CtaButtonProps) {
  const icon = size === 'xs' || size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]';
  return (
    <button
      type={type}
      className={ctaClass({ variant, size, arrow: loading ? undefined : arrow, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className={`${icon} animate-spin`} aria-hidden="true" />
          {loadingLabel ?? children}
        </span>
      ) : (
        <Contents arrow={arrow} size={size}>
          {children}
        </Contents>
      )}
    </button>
  );
}
