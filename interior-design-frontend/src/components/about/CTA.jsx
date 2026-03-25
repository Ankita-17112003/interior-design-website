// components/sections/CTA.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-pink-600 animate-gradient" />
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Moving Light Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="text-center text-white">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 drop-shadow-lg">
            Ready to Transform Your
            <span className="block font-bold text-yellow-300 mt-2 drop-shadow-2xl">
              Dream Space?
            </span>
          </h2>

          {/* Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
            Let's bring your vision to life. Whether it's a cozy home makeover or a complete commercial renovation, 
            our team of expert designers is here to create something extraordinary just for you.
          </p>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-white text-orange-600 rounded-lg font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Journey
              <svg
                className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Small trust text */}
          <p className="text-xs text-white/80 mt-6 font-light tracking-wide">
            ✦ Free consultation ✦ No obligation ✦ 100% satisfaction guaranteed ✦
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          20% { transform: translateX(100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-shine {
          animation: shine 8s ease-in-out infinite;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
};

export default CTA;