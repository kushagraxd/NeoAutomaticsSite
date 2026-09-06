import { useEffect } from 'react';

const SITE = 'Sree Raj Tools';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Sets the document title and description for a route. The base values in
 * index.html remain the crawler-visible defaults; this updates them for
 * in-app navigation.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const full = title === SITE ? title : `${title} | ${SITE}`;
    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  }, [title, description]);
}
