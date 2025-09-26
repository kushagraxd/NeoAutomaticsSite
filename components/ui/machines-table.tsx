import companyData from '@/data/company.json';

export default function MachinesTable() {
  const { company } = companyData;
  const machineEntries = Object.entries(company.machines).filter(([key]) => key !== 'Diesel_Genset');
  const dieselGenset = company.machines.Diesel_Genset;

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-display font-semibold text-slate-900">
          Manufacturing Equipment
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Equipment Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {machineEntries.map(([machine, count], index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {machine.replace(/_/g, ' ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {count}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                Diesel Generator
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {dieselGenset}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        <p className="text-sm text-slate-600">
          All equipment is regularly maintained and calibrated to ensure optimal performance and accuracy.
        </p>
      </div>
    </div>
  );
}
