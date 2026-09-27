import { company } from '../../../shared/company';

/*
 * Official Sreeraj Tools emblem (crown and SR monogram), extracted from the
 * supplied logo artwork with its paper background removed. Intrinsic sizes below
 * match the files in client/public/brand/ (filenames predate the spelling fix).
 *
 * The full lockup pairs the emblem with live text, so the name stays sharp at
 * every size and follows data/company.json.
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
  /** Colours for the written name on ivory/white (`light`) or charcoal (`graphite`); both keep "Tools" AA-legible. */
  surface?: 'light' | 'graphite';
}

const NAME_COLOURS: Record<NonNullable<BrandLogoProps['surface']>, { first: string; second: string }> = {
  light: { first: 'text-ink', second: 'text-bronze-text' },
  graphite: { first: 'text-graphite-ink', second: 'text-bronze-bright' },
};

export default function BrandLogo({ variant = 'full', size = 40, className = '', alt = '', surface = 'light' }: BrandLogoProps) {
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

  const colours = NAME_COLOURS[surface];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {emblem}
      <span
        className={`whitespace-nowrap font-bold leading-none tracking-[-0.02em] ${colours.first}`}
        style={{ fontSize: Math.max(16, Math.round(size * 0.46)) }}
      >
        {company.wordmark.first}
        <span className={colours.second}> {company.wordmark.second}</span>
      </span>
    </span>
  );
}
