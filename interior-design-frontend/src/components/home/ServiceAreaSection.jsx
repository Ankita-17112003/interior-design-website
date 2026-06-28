import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMapMarkerAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const ServiceAreaSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef([]);

  const cities = [
    "Pune",
    "Mumbai",
    "Nashik",
    "Pimpri-Chinchwad",
    "Nagpur",
    "Jalna",
    "Sambhaji Nagar",
    "Satara",
    "Kolhapur",
    "Sangali",
    "Karad",
    "Ichalkaranji",
    "Amaravati",
    "Akola",
    "Parbhani",
    "Sangamner",
    "Dhule",
    "Jalgoan",
    "Latur",
    "Dharashiv",
    "Hydrabad",
    "Kalburgi (karnataka)",
    "Beed"  
    
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade up
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Underline draw
      gsap.from(lineRef.current, {
        width: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Cards: scale + fade + rise, slightly bouncy but still elegant
      gsap.from(cardRefs.current, {
        y: 35,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index) => {
    gsap.to(cardRefs.current[index], {
      y: -6,
      scale: 1.03,
      boxShadow: "0 10px 30px rgba(200, 169, 126, 0.4)",
      borderColor: "#c8a97e",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardRefs.current[index], {
      y: 0,
      scale: 1,
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      borderColor: "transparent",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 text-center">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 font-playfair"
        >
          Areas <span className="text-orange-500">We Serve</span>
        </h2>

        <div
          ref={lineRef}
          className="h-[2px] bg-[#c8a97e] mx-auto mb-5 sm:mb-6"
          style={{ width: "60px" }}
        ></div>

        <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl mx-auto font-body">
          We design, build, and deliver — across all these cities.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {cities.map((city, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="bg-[#f8f6f2] rounded-xl py-6 sm:py-8 px-3 sm:px-4 border border-transparent transition-colors active:scale-95 active:border-[#c8a97e] cursor-pointer"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
              <FaMapMarkerAlt className="text-[#c8a97e] text-lg sm:text-xl mx-auto mb-2" />
              <p className="text-gray-800 font-semibold tracking-wide text-sm sm:text-base">
                {city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;