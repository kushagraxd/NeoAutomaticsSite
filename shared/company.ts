import companyData from '../data/company.json';

export interface CompanyMachine {
  [key: string]: number | string;
}

export interface CompanyUnit {
  name: string;
  address: string;
  phones: string[];
  emails: string[];
}

export interface CompanyData {
  name: string;
  email: string;
  phone: string;
  owner: string;
  units: CompanyUnit[];
  // Legacy fields for compatibility
  tagline?: string;
  hq?: string;
  certifications?: string[];
  strengths?: string[];
  machines?: CompanyMachine;
  heat_treatment?: string[];
  inspection?: string[];
  products?: string[];
  industries?: string[];
}

export const getCompanyData = (): CompanyData => {
  return companyData.company as CompanyData;
};

// Helper functions for common data access
export const getCompanyInfo = () => {
  const data = getCompanyData();
  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    owner: data.owner,
    units: data.units,
    // Legacy compatibility
    tagline: data.tagline || 'End-to-end machining, heat treatment & QA—delivered at scale',
    hq: data.hq || 'Rohtak, Haryana, India',
  };
};

// Helper for company name display with gradient styling
export const formatCompanyName = (name: string) => {
  const words = name.split(' ');
  if (words.length >= 2) {
    return {
      firstWord: words[0],
      restOfName: words.slice(1).join(' ')
    };
  }
  return {
    firstWord: name,
    restOfName: ''
  };
};

export const getManufacturingCapabilities = () => {
  const data = getCompanyData();
  return {
    units: data.units,
    machines: data.machines,
    certifications: data.certifications,
    strengths: data.strengths,
  };
};

export const getContactInfo = () => {
  const data = getCompanyData();
  return {
    email: data.email,
    phone: data.phone,
    units: data.units,
    hq: data.hq || 'Rohtak, Haryana, India',
  };
};

// Helper to get all company units with contact info
export const getCompanyUnits = () => {
  const data = getCompanyData();
  return data.units;
};

// Helper to format phone numbers for tel: links
export const formatPhoneForTel = (phone: string) => {
  // Remove any spaces, dashes, or parentheses and ensure it starts with +91
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) {
    return cleaned;
  }
  return `+91${cleaned}`;
};