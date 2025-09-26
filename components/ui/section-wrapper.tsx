import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function SectionWrapper({
  children,
  className,
  containerClassName,
}: SectionWrapperProps) {
  return (
    <section className={cn('py-20', className)}>
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
