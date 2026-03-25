// components/sections/TeamMemberCard.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TeamMemberCard = ({ member, index, isVisible }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const socialRefs = useRef([]);

  useEffect(() => {
    if (isVisible && cardRef.current) {
      const tl = gsap.timeline();

      // Card entrance
      tl.fromTo(cardRef.current,
        { 
          y: 60, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: "back.out(1.2)"
        }
      );

      // Image entrance
      tl.fromTo(imageRef.current,
        { scale: 0.5, opacity: 0, rotation: -5 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      );

      // Content entrance
      tl.fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.2"
      );

      // Social icons entrance
      tl.fromTo(socialRefs.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(2)"
        },
        "-=0.2"
      );

      // Subtle floating animation for the card
      gsap.to(cardRef.current, {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3
      });
    }
  }, [isVisible, index]);

  return (
    <div
      ref={cardRef}
      className="group relative w-full max-w-sm bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Card Border Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Container */}
      <div className="relative pt-8 pb-4 flex justify-center">
        {/* Decorative Background */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-orange-50 to-transparent" />
        
        {/* Image Circle with Rings */}
        <div className="relative">
          {/* Animated Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-30 blur-md animate-pulse" />
          <div className="absolute -inset-3 rounded-full border-2 border-orange-200 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
          <div className="absolute -inset-5 rounded-full border border-orange-100 opacity-30 group-hover:opacity-50 group-hover:scale-125 transition-all duration-500" />
          
          {/* Image */}
          <div 
            ref={imageRef}
            className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Role Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full shadow-lg">
              {member.role.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6 pt-8 text-center">
        <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-stone-800 mb-2">
          {member.name}
        </h3>
        
        <p className="text-orange-500 text-sm font-medium mb-3">
          {member.role}
        </p>
        
        <p className="text-stone-500 text-sm leading-relaxed mb-4">
          {member.description}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {member.expertise.map((item, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3">
          {['linkedin', 'instagram', 'twitter'].map((social, idx) => (
            <a
              key={social}
              ref={el => socialRefs.current[idx] = el}
              href={member.social[social]}
              className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-orange-500 group/link transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social === 'linkedin' && (
                <svg className="w-4 h-4 text-stone-600 group-hover/link:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )}
              {social === 'instagram' && (
                <svg className="w-4 h-4 text-stone-600 group-hover/link:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              )}
              {social === 'twitter' && (
                <svg className="w-4 h-4 text-stone-600 group-hover/link:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.447-4.066c.44-.793.777-1.639.98-2.518a9.98 9.98 0 002.396-4.942c.51-.371.957-.798 1.27-1.276z"/>
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-3xl" />
      </div>
    </div>
  );
};

export default TeamMemberCard;