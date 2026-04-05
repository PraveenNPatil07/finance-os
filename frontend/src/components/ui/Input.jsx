export default function Input({ 
  label, 
  error, 
  icon: Icon,
  className = '', 
  ...props 
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-primary">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-[50%] -translate-y-[50%] text-muted group-focus-within:text-brand transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input 
          className={`
            w-full bg-surface2 border border-border rounded-[10px] text-sm text-primary placeholder:text-muted transition-all duration-150 ease-out
            focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/15
            ${Icon ? 'py-2.5 pr-3.5 pl-10' : 'p-2.5 px-3.5'}
            ${error ? 'border-expense focus:border-expense focus:ring-expense/15' : ''}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-expense mt-1">{error}</span>}
    </div>
  );
}
