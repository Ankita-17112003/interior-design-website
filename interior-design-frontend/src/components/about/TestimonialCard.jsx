// components/TestimonialCard.jsx
import React from 'react';

const TestimonialCard = ({ testimonial }) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(testimonial.rating);
    const hasHalfStar = testimonial.rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-2.5 h-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (hasHalfStar && i === fullStars) {
        stars.push(
          <svg key={i} className="w-2.5 h-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${testimonial.id}-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${testimonial.id}-${i})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-2.5 h-2.5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Get random gradient color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'from-orange-500 to-orange-600',
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 h-full active:border-orange-200 touch-manipulation">
      {/* Mobile-optimized padding */}
      <div className="p-3.5 sm:p-5">
        {/* Header - Stack vertically on smallest screens */}
        <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            {/* Avatar - slightly smaller on mobile */}
            <div className={`
              w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getAvatarColor(testimonial.name)}
              flex items-center justify-center text-white text-xs sm:text-sm font-semibold shadow-sm
              active:scale-105 transition-transform duration-200
            `}>
              {getInitials(testimonial.name)}
            </div>
            
            {/* Name and Location - compact on mobile */}
            <div>
              <h4 className="font-['Playfair_Display'] font-semibold text-stone-800 text-sm sm:text-base leading-tight">
                {testimonial.name}
              </h4>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-stone-500">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate max-w-[100px] xs:max-w-none">{testimonial.location}</span>
              </div>
            </div>
          </div>
          
          {/* Rating - compact on mobile */}
          <div className="flex items-center justify-between xs:justify-end gap-2 ml-9 xs:ml-0">
            <div className="flex items-center gap-0.5">
              {renderStars()}
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full">
              {testimonial.rating}
            </span>
          </div>
        </div>

        {/* Quote Icon - smaller on mobile */}
        <div className="text-orange-200 mb-1.5 ml-1">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10,8c-3.3,0-6,2.7-6,6v6c0,3.3,2.7,6,6,6h6c3.3,0,6-2.7,6-6v-6c0-3.3-2.7-6-6-6H10z M26,8c-3.3,0-6,2.7-6,6v6c0,3.3,2.7,6,6,6h6c3.3,0,6-2.7,6-6v-6c0-3.3-2.7-6-6-6H26z"/>
          </svg>
        </div>

        {/* Testimonial Text - optimized for mobile reading */}
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3 mb-2.5 px-1">
          "{testimonial.text}"
        </p>

        {/* Verified badge - subtle on mobile */}
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-600 opacity-80 ml-1">
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Verified</span>
        </div>
      </div>

      {/* Subtle decorative element */}
      <div className="absolute bottom-0 right-0 w-8 h-8 opacity-30">
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-orange-500/20 to-transparent rounded-tl-xl" />
      </div>
    </div>
  );
};

export default TestimonialCard;