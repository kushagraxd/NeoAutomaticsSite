import { getCompanyData } from '../shared/company';

/**
 * Get company capabilities for AI context
 */
export function getCapabilities() {
  const data = getCompanyData();
  return {
    certifications: data.certifications || [],
    machines: data.machines || {},
    heat_treatment: data.heat_treatment || [],
    inspection: data.inspection || [],
    strengths: data.strengths || [],
  };
}

/**
 * Get product list for AI context
 */
export function getProducts() {
  const data = getCompanyData();
  return data.products || [];
}

/**
 * Get manufacturing units for AI context
 */
export function getUnits() {
  const data = getCompanyData();
  return data.units || [];
}

/**
 * Get comprehensive company context for AI prompts
 */
export function getCompanyContext() {
  const data = getCompanyData();
  const capabilities = getCapabilities();
  
  return {
    name: data.name,
    certifications: capabilities.certifications,
    totalCNC: capabilities.machines.CNC || 30,
    strengths: capabilities.strengths,
    products: getProducts(),
    industries: data.industries || [],
    heat_treatment: capabilities.heat_treatment,
    inspection: capabilities.inspection,
    units: getUnits().length,
  };
}

/**
 * Format company capabilities as text for AI prompts
 */
export function formatCapabilitiesForAI(): string {
  const context = getCompanyContext();
  
  return `Neo Automatics is an ${context.certifications.join(', ')} certified manufacturer with:
- ${context.totalCNC} CNC machines across ${context.units} units
- In-house heat treatment: ${context.heat_treatment.join(', ')}
- Full QA lab with: ${context.inspection.slice(0, 3).join(', ')}
- Products: ${context.products.join(', ')}
- Industries: ${context.industries.join(', ')}
- Key strengths: ${context.strengths.slice(0, 3).join(', ')}`;
}