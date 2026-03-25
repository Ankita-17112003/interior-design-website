// components/Modal.jsx
import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, item, onNext, onPrev, hasNext, hasPrev }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleKeyLeft = (e) => {
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    
    const handleKeyRight = (e) => {
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('keydown', handleKeyLeft);
      document.addEventListener('keydown', handleKeyRight);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('keydown', handleKeyLeft);
      document.removeEventListener('keydown', handleKeyRight);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext, hasNext, hasPrev]);

  if (!isOpen || !item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
        style={{ animation: 'modalFadeIn 0.3s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-stone-700 rounded-full p-2 shadow-lg transition-all hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Media Container */}
        <div className="relative bg-stone-100" style={{ height: '500px' }}>
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              src={item.src}
              controls
              autoPlay
              className="w-full h-full object-contain"
              playsInline
            />
          )}

          {/* Navigation Arrows - On the sides */}
          {hasPrev && (
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {hasNext && (
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {item.type === 'video' ? '🎬 VIDEO' : '📷 PHOTO'}
          </div>
        </div>

        {/* Footer with Project Details */}
        <div className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-stone-900 mb-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 text-stone-600 text-sm font-['Poppins']">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="w-1 h-1 bg-stone-300 rounded-full" />
                <span>{item.location}</span>
              </div>
            </div>
            
            {/* Navigation Info */}
            <div className="text-stone-400 text-sm font-['Poppins']">
              {hasPrev && hasNext ? '←  →' : hasPrev ? '←' : hasNext ? '→' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles in a style tag */}
      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;