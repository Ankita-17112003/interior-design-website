import React, { useEffect, useRef } from "react";
import img from "../../assets/img4.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceSection = () => {
  const sectionRef = useRef(null);
  const listRef = useRef([]);

  const services = [
    "Residential Interior Design",
    "Commercial & Hospitality Design",
    "Turnkey",
    "Consultancy",
    "Themed Interior",
    "Renovation",
    "Space Management",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-text", {
        y: 70,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".service-img", {
        y: 70,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(listRef.current, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-[#f8f6f2] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* IMAGE FIRST ON MOBILE, SECOND ON DESKTOP */}
          <div className="service-img order-1 md:order-2">
            <img
              src={img}
              alt="Interior Design"
              className="rounded-xl shadow-lg w-full h-[240px] sm:h-[320px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </div>

          {/* TEXT SECOND ON MOBILE, FIRST ON DESKTOP */}
          <div className="service-text order-2 md:order-1 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 font-playfair">
              Our <span className="text-orange-500">Services</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed font-body">
              We provide modern and elegant interior design solutions that
              transform your home and workspace into beautiful and functional
              environments.
            </p>

            <div className="space-y-3 sm:space-y-4 inline-block text-left">
              {services.map((service, index) => (
                <div
                  key={index}
                  ref={(el) => (listRef.current[index] = el)}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#c8a97e] text-lg sm:text-xl">✔</span>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
