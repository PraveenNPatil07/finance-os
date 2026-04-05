export default function Skeleton({ className = '', variant = 'text' }) {
  const baseClass = 'animate-shimmer bg-surface-2 bg-[length:200%_100%]';
  
  const variants = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    row: 'h-12 w-full rounded-lg',
  };

  return (
    <div
      className={`${baseClass} ${variants[variant]} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, var(--color-surface) 25%, var(--color-surface-2) 50%, var(--color-surface) 75%)'
      }}
    />
  );
}
