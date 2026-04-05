export default function Badge({ 
  children, 
  variant = 'viewer',
  className = '' 
}) {
  const variants = {
    income: 'bg-income-dim text-income border border-income/20',
    expense: 'bg-expense-dim text-expense border border-expense/20',
    admin: 'bg-brand-dim text-brand border border-brand/20',
    analyst: 'bg-info/10 text-info border border-info/20',
    viewer: 'bg-surface2 text-muted border border-border',
    active: 'bg-income-dim text-income',
    inactive: 'bg-warning/10 text-warning border border-warning/20',
  };

  const isActiveUser = variant === 'active';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {isActiveUser && (
        <span className="w-1.5 h-1.5 rounded-full bg-income animate-[pulse_2s_infinite]"></span>
      )}
      {children}
    </span>
  );
}
