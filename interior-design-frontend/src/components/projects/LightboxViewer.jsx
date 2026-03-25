// components/LightboxViewer.jsx
import React, { useEffect, useState } from 'react';

const LightboxViewer = ({ 
  isOpen, 
  onClose, 
  items, 
  currentIndex, 
  onNext, 
  onPrev 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch(e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  // Reset loading state when item changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  if (!isOpen || !currentItem) return null;

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-3 transition-all hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Media Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button 
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`
            absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40
            bg-white/10 hover:bg-white/20 text-white rounded-full p-3 md:p-4
            transition-all hover:scale-110 backdrop-blur-sm
            ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}
          `}
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Media */}
        <div className="relative w-full h-full flex items-center justify-center">
          {currentItem.type === 'image' ? (
            <img
              src={currentItem.src}
              alt={currentItem.title}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              style={{ animation: 'lightboxZoomIn 0.3s ease-out' }}
              onLoad={handleMediaLoad}
            />
          ) : (
            <video
              key={currentItem.src}
              src={currentItem.src}
              controls
              autoPlay
              className="max-w-full max-h-full w-auto h-auto rounded-lg shadow-2xl"
              style={{ animation: 'lightboxZoomIn 0.3s ease-out' }}
              onLoadedData={handleMediaLoad}
              playsInline
            />
          )}
        </div>

        {/* Next Button */}
        <button 
          onClick={onNext}
          disabled={currentIndex === items.length - 1}
          className={`
            absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40
            bg-white/10 hover:bg-white/20 text-white rounded-full p-3 md:p-4
            transition-all hover:scale-110 backdrop-blur-sm
            ${currentIndex === items.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}
          `}
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h3 className="font-['Playfair_Display'] text-white text-2xl md:text-3xl mb-2">
                {currentItem.title}
              </h3>
              <p className="text-stone-300 text-sm md:text-base max-w-2xl font-['Poppins']">
                {currentItem.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-stone-300 text-sm">
                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">
                  {currentItem.category}
                </span>
                <span className="w-1 h-1 bg-orange-500 rounded-full" />
                <span>{currentItem.location}</span>
              </div>
              <div className="text-white/50 text-sm font-['Poppins']">
                {currentIndex + 1} / {items.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes lightboxZoomIn {
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

export default LightboxViewer;