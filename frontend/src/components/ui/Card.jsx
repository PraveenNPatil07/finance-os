export default function Card({ 
  children, 
  variant = 'default',
  accentColor = null,
  className = '',
  onClick
}) {
  const isInteractive = !!onClick;
  
  const variants = {
    default: 'bg-surface border border-border rounded-2xl p-6 transition-all duration-200',
    stat: 'bg-surface border border-border rounded-2xl p-6 transition-all duration-200',
    glow: 'bg-surface border border-border rounded-2xl p-6 transition-all duration-200 shadow-[0_0_0_1px_rgba(124,58,237,0.3),0_4px_24px_rgba(124,58,237,0.1)]',
  };

  let interactiveClasses = '';
  if (isInteractive) {
    interactiveClasses = 'cursor-pointer hover:border-border-hover hover:shadow-card hover:-translate-y-0.5';
  }

  let accentStyle = {};
  if (variant === 'stat' && accentColor) {
    accentStyle = { borderLeft: `4px solid var(--color-${accentColor})` };
  }

  return (
    <div 
      className={`${variants[variant]} ${interactiveClasses} ${className}`}
      style={accentStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
