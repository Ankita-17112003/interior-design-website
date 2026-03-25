// components/sections/Mission.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const drivingForceRef = useRef(null);
  const cardsRef = useRef([]);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title section animation
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      titleTl
        .from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(subtitleRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.4")
        .from(dividerRef.current, {
          width: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.3");

      // Driving force animation
      gsap.from(drivingForceRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.2)",
        });
      });

      // Quote animation
      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-stone-50 via-white to-stone-50 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 
            ref={titleRef}
            className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-3"
          >
            Chandak And Associates
          </h1>
          <p 
            ref={subtitleRef}
            className="font-['Poppins'] text-sm sm:text-base md:text-lg text-stone-500 tracking-wide"
          >
            Interior Design Studio
          </p>
          <div 
            ref={dividerRef}
            className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Driving force tag */}
        <div 
          ref={drivingForceRef}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-3 text-orange-500 font-['Poppins'] text-xs sm:text-sm font-medium uppercase tracking-[0.3em]">
            <span className="w-8 h-px bg-orange-300" />
            Driving Force
            <span className="w-8 h-px bg-orange-300" />
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {/* Our Values Card */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card Content */}
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                  <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                  Our Values
                </h2>
              </div>
              
              <p className="font-['Poppins'] text-sm sm:text-base text-stone-600 leading-relaxed">
                Integrity, creativity, excellence, and client satisfaction drive everything we do. 
                We believe in honest communication and collaborative partnerships.
              </p>
            </div>
          </div>

          {/* Core principles Card */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card Content */}
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 transition-all duration-300">
                  <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-stone-800 group-hover:text-purple-600 transition-colors">
                  Core Principles
                </h2>
              </div>
              
              <ul className="space-y-3 text-sm sm:text-base text-stone-600">
                <li className="flex items-start gap-3 group-hover:translate-x-1 transition-transform">
                  <span className="text-purple-500 mt-1 text-lg">•</span>
                  <span className="font-['Poppins']">Client-first approach in every project</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-2 transition-transform">
                  <span className="text-purple-500 mt-1 text-lg">•</span>
                  <span className="font-['Poppins']">Transparent communication throughout</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-3 transition-transform">
                  <span className="text-purple-500 mt-1 text-lg">•</span>
                  <span className="font-['Poppins']">Sustainable design practices</span>
                </li>
                <li className="flex items-start gap-3 group-hover:translate-x-4 transition-transform">
                  <span className="text-purple-500 mt-1 text-lg">•</span>
                  <span className="font-['Poppins']">Attention to every detail</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Approach Card */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden md:col-span-2"
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card Content */}
            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                {/* Title */}
                <h2 className="font-['Playfair_Display'] text-xl sm:text-2xl font-bold text-stone-800 group-hover:text-blue-600 transition-colors">
                  Our Approach
                </h2>
              </div>
              
              <p className="font-['Poppins'] text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
                We combine artistic vision with practical functionality, ensuring every design 
                is both beautiful and livable for years to come. Our collaborative process 
                brings your dreams to life with precision and passion.
              </p>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div 
          ref={quoteRef}
          className="relative max-w-3xl mx-auto text-center"
        >
          {/* Quote Marks */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-orange-200 font-serif">"</div>
          
          <p className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-3xl text-stone-700 italic leading-relaxed">
            Creating spaces that inspire, designs that endure, and relationships that last.
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-orange-300" />
            <span className="font-['Poppins'] text-sm text-stone-500 uppercase tracking-wider">
              Our Promise
            </span>
            <div className="w-12 h-px bg-orange-300" />
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Mission;