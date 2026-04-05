import { Inbox } from 'lucide-react';
import Skeleton from './Skeleton';

export default function Table({ 
  columns, 
  data, 
  isLoading, 
  emptyStateMessage = "No results found",
  emptyStateSubMessage = "Try adjusting your filters.",
  onRowClick
}) {
  
  if (isLoading) {
    return (
      <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
        <div className="flex items-center bg-surface2 border-b border-border px-5 py-3">
          {columns.map((col, i) => (
             <div key={i} className="flex-1">
               <Skeleton variant="text" className="w-16" />
             </div>
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center border-b border-border px-5 py-4 last:border-b-0">
            {columns.map((col, j) => (
               <div key={j} className="flex-1">
                 <Skeleton variant="text" className={j === 0 ? "w-24" : "w-16"} />
               </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden min-h-[240px] flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-full bg-surface2 flex items-center justify-center mb-4 text-muted">
          <Inbox size={32} />
        </div>
        <h3 className="text-base font-medium text-secondary">{emptyStateMessage}</h3>
        <p className="text-sm text-muted mt-1">{emptyStateSubMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface border border-border rounded-2xl overflow-hidden overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-surface2 border-b border-border">
            {columns.map((col, i) => (
              <th 
                key={i} 
                className={`text-xs font-medium uppercase tracking-widest text-muted px-5 py-3 whitespace-nowrap ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="group/tbody">
          {data.map((row, i) => (
            <tr 
              key={row.id || i} 
              onClick={() => onRowClick && onRowClick(row)}
              className={`
                group border-b border-border last:border-b-0 transition-colors duration-150 ease-out
                hover:bg-surface2 ${onRowClick ? 'cursor-pointer' : ''}
              `}
            >
              {columns.map((col, j) => (
                <td 
                  key={j} 
                  className={`px-5 py-4 align-middle text-sm text-primary ${col.className || ''}`}
                >
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
