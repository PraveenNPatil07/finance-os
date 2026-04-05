export default function Spinner({ size = 'md', fullPage = false }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div 
      className={`${sizeMap[size]} border-surface2 border-t-brand rounded-full animate-spin`}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/80 backdrop-blur-sm animate-fade-in">
        {spinner}
      </div>
    );
  }

  return <div className="inline-flex justify-center items-center">{spinner}</div>;
}
