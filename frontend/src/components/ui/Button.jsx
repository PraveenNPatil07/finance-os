import { Loader2 } from 'lucide-react';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false, 
  disabled = false,
  ...props 
}) {
  const baseStyled = 'inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg select-none cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-gradient text-white shadow-glow-sm hover:brightness-110 active:scale-[0.98]',
    outline: 'bg-transparent border border-border text-secondary hover:border-brand hover:text-brand hover:bg-brand-dim active:scale-[0.98]',
    ghost: 'bg-transparent text-secondary hover:bg-surface2 hover:text-primary active:scale-[0.98]',
    danger: 'bg-expense-gradient text-white shadow-[0_2px_8px_rgba(244,63,94,0.4)] hover:brightness-110 active:scale-[0.98]',
    icon: 'w-9 h-9 p-0 hover:bg-surface2 active:scale-[0.95] text-secondary',
  };
  
  // Padding overrides for non-icon buttons
  const isIcon = variant === 'icon';
  const pxPy = isIcon ? '' : 'px-5 py-2.5 text-sm';

  const isDisabled = disabled || loading;
  const disabledStyles = isDisabled ? 'opacity-60 cursor-not-allowed active:scale-100 hover:brightness-100' : '';

  return (
    <button 
      className={`${baseStyled} ${variants[variant]} ${pxPy} ${disabledStyles} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin text-current opacity-80" />
      ) : null}
      {children}
    </button>
  );
}
