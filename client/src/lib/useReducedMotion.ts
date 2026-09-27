import { useEffect, useState } from 'react';

const query = '(prefers-reduced-motion: reduce)';

/** Live `prefers-reduced-motion` preference; updates if the visitor changes it. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
