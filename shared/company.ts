import companyData from '../data/company.json';

/**
 * A contact field that is only rendered publicly once the owner confirms it.
 * Until then the UI must fall back to the enquiry form rather than print a
 * placeholder — no fake phone numbers or addresses reach the page.
 */
export interface ConfirmableField {
  value: string | null;
  confirmed: boolean;
  needs: string;
}

export interface CompanyContact {
  email: ConfirmableField;
  phone: ConfirmableField;
  whatsapp: ConfirmableField;
  address: ConfirmableField;
  city: ConfirmableField;
  gstin: ConfirmableField;
  iec: ConfirmableField;
  domain: ConfirmableField;
  hours: ConfirmableField;
}

export interface Company {
  name: string;
  displayName: string;
  wordmark: { first: string; second: string };
  tagline: string;
  descriptor: string;
  summary: string;
  shortSummary: string;
  basedIn: string;
  country: string;
  sourcingRegions: string[];
  marketNote: string;
  parentFirm: { name: string; relationship: string; note: string };
  contact: CompanyContact;
  claims: {
    certifications: string[];
    yearsExperience: number | null;
    customerCount: number | null;
    countriesServed: number | null;
    authorisedDistributorFor: string[];
    partnerships: string[];
  };
}

export const company = companyData.company as unknown as Company;

/** Returns the value only when the owner has confirmed it, otherwise null. */
export function confirmed(field: ConfirmableField): string | null {
  return field.confirmed && field.value ? field.value : null;
}

/** Every contact detail still awaiting confirmation — surfaced in the admin note. */
export function pendingContactFields(): Array<{ key: string; needs: string }> {
  return (Object.entries(company.contact) as Array<[string, ConfirmableField]>)
    .filter(([, f]) => !f.confirmed || !f.value)
    .map(([key, f]) => ({ key, needs: f.needs }));
}

export function telHref(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return cleaned.startsWith('+') ? `tel:${cleaned}` : `tel:+91${cleaned}`;
}

export const SITE_NAME = company.displayName;
