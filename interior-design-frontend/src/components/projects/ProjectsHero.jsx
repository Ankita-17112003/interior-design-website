import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ProjectHero = () => {
  // Refs for animation elements
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Create timeline for coordinated animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial states
    gsap.set([labelRef.current, headingRef.current, descriptionRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    });

    gsap.set(backgroundRef.current, {
      opacity: 0
    });

    // Animation sequence
    tl.to(backgroundRef.current, {
      opacity: 1,
      duration: 1.5,
    })
    .to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.8')
    .to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.6')
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.6')
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.6');

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80')`,
          }}
        >
          {/* Dark Gradient Overlay - darker on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 sm:from-black/80 sm:via-black/50 sm:to-transparent"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center">
        <div className="text-white w-full sm:max-w-2xl">
          {/* Small Label */}
          <p
            ref={labelRef}
            className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4 text-[#E8D5C4] font-['Poppins']"
          >
            Chandak And Associates
          </p>

          {/* Main Heading - Optimized for mobile */}
          <h1
            ref={headingRef}
            className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="block">Designs That</span>
            <span className="block text-[#E8D5C4]">Transform Spaces</span>
          </h1>

          {/* Description - Shorter on mobile */}
          <p
            ref={descriptionRef}
            className="font-['Poppins'] text-sm sm:text-base lg:text-lg text-gray-200 mb-8 sm:mb-10 max-w-md sm:max-w-lg leading-relaxed pr-4 sm:pr-0"
          >
            <span className="hidden sm:inline">Explore our curated collection of luxury interior design projects that blend elegance with functionality, creating spaces that inspire and endure.</span>
            <span className="sm:hidden">Luxury interior design projects that blend elegance with functionality.</span>
          </p>

          {/* CTA Button */}
          <div ref={buttonRef}>
            <button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fa8c2d] text-gray-900 font-['Poppins'] font-medium text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(232,213,196,0.3)] hover:scale-105"
            >
              <span className="relative z-10">Explore Projects</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="w-px h-16 bg-white/30 mx-auto"></div>
        <p className="text-white/60 text-xs tracking-wider mt-2 font-['Poppins']">SCROLL</p>
      </div>
    </section>
  );
};

export default ProjectHero;