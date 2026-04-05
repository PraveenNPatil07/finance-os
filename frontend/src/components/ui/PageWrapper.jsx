export default function PageWrapper({ children, className = '' }) {
  return (
    <div className={`animate-fade-in animate-slide-up ${className}`}>
      {children}
    </div>
  );
}
