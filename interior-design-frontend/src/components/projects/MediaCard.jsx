import React, { useState } from 'react';

const getYoutubeId = (url) => {
  if (!url) return null;
  const normalMatch = url.match(/[?&]v=([^&]+)/);
  if (normalMatch) return normalMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];
  const shortsMatch = url.match(/\/shorts\/([^?]+)/);
  if (shortsMatch) return shortsMatch[1];
  return null;
};

const MediaCard = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const youtubeId = getYoutubeId(item.youtubeUrl);

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-stone-100 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(item)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">

        {/* ── IMAGE ── */}
        {item.type === 'image' && (
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        )}

        {/* ── YOUTUBE ── */}
        {item.type === 'youtube' && youtubeId && (
          <div className="relative w-full h-full">
            {/* YouTube thumbnail as cover */}
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                // fallback to lower quality if maxres not available
                e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
              }}
            />
            {/* Play button overlay */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-red-600 scale-110' : 'bg-red-600/80'}`}>
                <svg className="w-6 h-6 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Title on hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <h3 className="font-['Playfair_Display'] text-white text-lg font-semibold">
            {item.title}
          </h3>
        </div>

        {/* Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-1 text-xs font-['Poppins'] rounded-full shadow-lg ${item.type === 'youtube' ? 'bg-red-600 text-white' : 'bg-white/90 text-stone-800 backdrop-blur-sm'}`}>
            {item.type === 'youtube' ? '▶ YouTube' : '📷'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default MediaCard;