import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  footer
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-[4px] animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <div className="relative w-full max-w-[480px] w-[95vw] sm:w-[90vw] max-h-[90vh] bg-surface border border-border sm:rounded-[20px] p-5 sm:p-7 shadow-modal animate-slide-up flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h2 className="text-lg font-semibold text-primary font-display">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:bg-surface2 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="py-5 overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
