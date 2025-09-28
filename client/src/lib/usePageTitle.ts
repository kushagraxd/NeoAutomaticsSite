import { useEffect } from 'react';

/**
 * Custom hook to set the document title and meta description for SPA pages
 * @param title - The title to set
 * @param description - Optional meta description
 * @param template - Optional template string with %s placeholder
 */
export function usePageTitle(
  title: string, 
  description?: string, 
  template: string = '%s | Neo Automatics'
) {
  useEffect(() => {
    // Set document title
    const formattedTitle = template.replace('%s', title);
    document.title = formattedTitle;
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    
    // Update description content
    metaDescription.content = description || 
      'End-to-end machining, heat treatment & QA—delivered at scale. ISO 9001:2015 certified manufacturer with 20+ years experience.';
      
  }, [title, description, template]);
}