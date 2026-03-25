// components/MediaCard.jsx
import React, { useState, useRef } from 'react';

const MediaCard = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-stone-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
    >
      {/* Aspect ratio container - 4:3 */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {item.type === 'image' ? (
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={item.src}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            />
            {/* Play Icon Overlay */}
            <div className={`
              absolute inset-0 flex items-center justify-center bg-black/20
              transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
                ${isHovered ? 'bg-orange-500 scale-110' : 'bg-white/90'}
              `}>
                <svg 
                  className={`w-6 h-6 ml-1 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-orange-500'}`}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
          transition-opacity duration-500
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `} />

        {/* Title Overlay */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4
          transition-transform duration-500
          ${isHovered ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <h3 className="font-['Playfair_Display'] text-white text-lg font-semibold">
            {item.title}
          </h3>
        </div>

        {/* Media Type Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`
            px-2 py-1 text-xs font-['Poppins'] rounded-full shadow-lg
            ${item.type === 'video' 
              ? 'bg-orange-500 text-white' 
              : 'bg-white/90 text-stone-800 backdrop-blur-sm'
            }
          `}>
            {item.type === 'video' ? '🎬' : '📷'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;