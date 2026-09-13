import { company } from '../../../shared/company';

/*
 * Official ShreeRaj emblem (crown and SR monogram), extracted from the supplied
 * logo artwork with its paper background removed. Intrinsic sizes below match
 * the files in client/public/brand/.
 *
 * The supplied artwork's lettering reads "SREERAJ"; the brand name is written as
 * "ShreeRaj Tools", so the full lockup pairs the emblem with live text rather
 * than showing the mismatched wordmark.
 */
const EMBLEM = { width: 641, height: 512 };
const EMBLEM_SM = { width: 200, height: 160 };

export interface BrandLogoProps {
  /** `full` = emblem with the written name; `emblem` = mark only. */
  variant?: 'full' | 'emblem';
  /** Rendered emblem height in pixels. */
  size?: number;
  className?: string;
  /** Leave empty when a parent link already names the destination. */
  alt?: string;
}

export default function BrandLogo({ variant = 'full', size = 40, className = '', alt = '' }: BrandLogoProps) {
  const small = size <= 80;
  const file = small ? 'shreeraj-emblem-sm' : 'shreeraj-emblem';
  const dims = small ? EMBLEM_SM : EMBLEM;

  const emblem = (
    <picture className="block shrink-0">
      <source type="image/webp" srcSet={`/brand/${file}.webp`} />
      <img
        src={`/brand/${file}.png`}
        width={dims.width}
        height={dims.height}
        alt={variant === 'emblem' ? alt : ''}
        decoding="async"
        className="block max-w-none"
        // Height is fixed; width follows the image's own proportions, so the mark can never be stretched.
        style={{ height: size, width: 'auto' }}
      />
    </picture>
  );

  if (variant === 'emblem') {
    return <span className={`inline-flex ${className}`}>{emblem}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {emblem}
      <span
        className="whitespace-nowrap font-semibold leading-none tracking-[-0.025em] text-ink"
        style={{ fontSize: Math.max(16, Math.round(size * 0.46)) }}
      >
        {company.wordmark.first}
        <span className="text-gold"> {company.wordmark.second}</span>
      </span>
    </span>
  );
}
