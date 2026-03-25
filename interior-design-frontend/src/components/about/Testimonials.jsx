// components/sections/Testimonials.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TestimonialCard from './TestimonialCard';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [direction, setDirection] = useState('next');

  const testimonials = [
    {
      id: 1,
      name: "Sarika Wala",
      location: "Pune",
      rating: 5,
      text: "Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism  Services :Dinning Room Design,Door design, home decor selection planning  "
    },
    {
      id: 2,
      name: "Mr.Ravindra Kumar",
      location: "Pune",
      rating: 5,
      text: "Very Nice Person and Architect. Positive:Good, Sevices : Commercial interior design ,dinning room design ,door design,interior architectural design,Interior Decorating and lighting design  "
    },
    {
      id: 3,
      name: "Mr.Sandip Lahoti",
      location: "Jalna",
      rating: 5,
      text: "Great Work... on time service cooperative staff.positive:Responsivness,Punctuality,Quality,Professionalism,Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism,Value. Services: Dining Room design,Door design, Home decor selection,interior painting"
    },
    {
      id: 4,
      name: "Mr.Dipak Maykar",
      location: "Pune",
      rating: 4,
      text: "Thank you sir I'm happy with your services you have given a good service and quality of work Positive: Responsiveness,Punctuality,Quality,Professionalism,Value "
    },
    {
      id: 5,
      name: "Ms.Snehal Bumb",
      location: "Pune",
      rating: 5,
      text: "Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism  Services :Dinning Room Design, home decor selection planning "
    },
   {
      id: 6,
      name: "Ms.Lakshmi Chakare",
      location: "Pune",
      rating: 4.5,
      text: "Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism  Services :Dinning Room Design, home decor selection planning "
    },
    {
      id:7 ,
      name: "Ms.Dipali  Chandak",
      location: "Pune",
      rating: 5,
      text: "Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism  Services :Dinning Room Design, home decor selection planning "
    },
    {
      id: 8,
      name: "Ms.Divya Chandak",
      location: "Pune",
      rating:4.5,
      text: "Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism  Services :Dinning Room Design, home decor selection planning "
    },
    {
      id: 9,
      name: "Mr.Shashikant Dalvi",
      location: "Pune",
      rating: 4.5,
      text: "Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism  Services :Dinning Room Design, home decor selection planning "
    },
    {
      id: 10,
      name: "Mr.Kalyan Rode",
      location: "Wagholi,Pune",
      rating: 4.5,
      text: "Well planned interior work. Looks very nice. Thank you. Positive: Punctuality,Quality, Professionalism  Services :Dinning Room Design, home decor selection planning "
    }

  ];

  // Smooth slide change
  const changeSlide = useCallback((newIndex) => {
    if (newIndex < 0) newIndex = testimonials.length - 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    
    setDirection(newIndex > currentIndex ? 'next' : 'prev');
    setCurrentIndex(newIndex);
  }, [currentIndex, testimonials.length]);

  const nextSlide = useCallback(() => {
    changeSlide(currentIndex + 1);
  }, [currentIndex, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide(currentIndex - 1);
  }, [currentIndex, changeSlide]);

  // Auto-play with smooth interval
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Card entrance animation
      gsap.fromTo(sliderRef.current,
        { 
          x: direction === 'next' ? 50 : -50,
          opacity: 0.5 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }, [direction, currentIndex]);

    return () => ctx.revert();
  }, [currentIndex, direction]);

  // Calculate average rating
  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-stone-50 to-white overflow-hidden"
    >
      {/* Simple background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-orange-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-blue-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title - Simplified */}
       {/* Section Title - Professional */}
<div ref={titleRef} className="text-center mb-8 sm:mb-12">
  <span className="text-orange-500 text-xs sm:text-sm font-semibold tracking-wider uppercase block mb-2">
    Testimonials
  </span>
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-stone-800">
    What Our 
    <span className="font-bold text-stone-900"> Clients Say</span>
  </h2>
  <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-2xl mx-auto">
    Real stories from the people we've had the pleasure of working with
  </p>
  <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-transparent mx-auto mt-4" />
</div>

        
        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Card Display */}
          <div ref={sliderRef} className="relative px-4 sm:px-8">
            <div className="relative h-[380px] sm:h-[350px] md:h-[320px]">
              {testimonials.map((testimonial, index) => {
                // Calculate position relative to current index
                let position = 'hidden';
                if (index === currentIndex) position = 'active';
                else if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) position = 'prev';
                else if (index === (currentIndex + 1) % testimonials.length) position = 'next';
                
                return (
                  <div
                    key={testimonial.id}
                    className={`
                      absolute inset-0 transition-all duration-700 ease-in-out
                      ${position === 'active' 
                        ? 'opacity-100 translate-x-0 scale-100 z-20' 
                        : position === 'prev'
                          ? 'opacity-0 sm:opacity-40 -translate-x-full sm:-translate-x-20 scale-90 z-10 hidden sm:block'
                          : position === 'next'
                            ? 'opacity-0 sm:opacity-40 translate-x-full sm:translate-x-20 scale-90 z-10 hidden sm:block'
                            : 'hidden'
                      }
                    `}
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      isActive={position === 'active'}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simple Navigation Arrows - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-stone-600 hover:text-orange-500 hover:scale-110 transition-all duration-300"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-stone-600 hover:text-orange-500 hover:scale-110 transition-all duration-300"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Simple Dots */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className="group"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`
                    block h-1.5 rounded-full transition-all duration-500
                    ${index === currentIndex 
                      ? 'w-6 bg-orange-500' 
                      : 'w-1.5 bg-stone-300 group-hover:bg-orange-300'
                    }
                  `}
                />
              </button>
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <p className="text-center text-xs text-stone-400 mt-3 sm:hidden">
            ← Swipe to see more →
          </p>
        </div>

        {/* Explore Section
        <div className="text-center mt-8 sm:mt-12">
          <h3 className="text-base sm:text-lg font-semibold text-stone-700 mb-1">
            Explore
          </h3>
          <p className="text-sm text-orange-500 font-medium">
            What our Clients say!
          </p>
        </div> */}

        
       
      </div>
    </section>
  );
};

export default Testimonials;