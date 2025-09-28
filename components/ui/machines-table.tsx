import React from 'react';
import companyData from '@/data/company.json';

export default function MachinesTable() {
  const { company } = companyData;
  const machineEntries = Object.entries(company.machines).filter(([key]) => key !== 'Diesel_Genset');
  const dieselGenset = company.machines.Diesel_Genset;

  return (
    <div className="bg-bg-elevated rounded-2xl overflow-hidden border border-border">
      <div className="px-6 py-4 bg-accent-primary/5 border-b border-border">
        <h3 className="text-lg font-display font-semibold text-text-primary">
          Manufacturing Equipment
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-accent-primary/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Equipment Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg-base divide-y divide-border">
            {machineEntries.map(([machine, count], index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                  {machine.replace(/_/g, ' ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                  {count}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                Diesel Generator
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                {dieselGenset}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-accent-primary/5 border-t border-border">
        <p className="text-sm text-text-muted">
          All equipment is regularly maintained and calibrated to ensure optimal performance and accuracy.
        </p>
      </div>
    </div>
  );
}
