export default function Select({ 
  label, 
  options = [], 
  error,
  className = '',
  ...props 
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-primary">{label}</label>}
      <div className="relative">
        <select 
          className={`
            w-full bg-surface2 border border-border rounded-[10px] text-sm text-primary transition-all duration-150 ease-out appearance-none
            focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/15 p-2.5 px-3.5 pr-10
            ${error ? 'border-expense focus:border-expense focus:ring-expense/15' : ''}
          `}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-surface2 text-primary">{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-3.5 top-[50%] -translate-y-[50%] text-muted pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-expense mt-1">{error}</span>}
    </div>
  );
}
