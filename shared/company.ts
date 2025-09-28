import companyData from '../data/company.json';

export interface CompanyMachine {
  [key: string]: number | string;
}

export interface CompanyUnit {
  name: string;
  address: string;
}

export interface CompanyData {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  owner: string;
  hq: string;
  units: CompanyUnit[];
  certifications: string[];
  strengths: string[];
  machines: CompanyMachine;
  heat_treatment: string[];
  inspection: string[];
  products: string[];
  industries: string[];
}

export const getCompanyData = (): CompanyData => {
  return companyData.company as CompanyData;
};

// Helper functions for common data access
export const getCompanyInfo = () => {
  const data = getCompanyData();
  return {
    name: data.name,
    tagline: data.tagline,
    email: data.email,
    phone: data.phone,
    owner: data.owner,
    hq: data.hq,
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
    hq: data.hq,
  };
};