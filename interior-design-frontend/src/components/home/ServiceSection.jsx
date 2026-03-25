import React, { useEffect, useRef } from "react";
import img from "../../assets/img1.jpg";
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
    "Space Management"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".service-img", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(listRef.current, {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
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
    <section ref={sectionRef} className="py-20 bg-[#f8f6f2]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE FIRST ON MOBILE, SECOND ON DESKTOP */}
          <div className="service-img order-1 md:order-2">
            <img
              src={img}
              alt="Interior Design"
              className="rounded-xl shadow-lg w-full h-[350px] md:h-[420px] object-cover"
            />
          </div>

          {/* TEXT SECOND ON MOBILE, FIRST ON DESKTOP */}
          <div className="service-text order-2 md:order-1">

            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-playfair">
             Our <span className="text-orange-500">Services</span>
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed font-body">
              We provide modern and elegant interior design solutions that
              transform your home and workspace into beautiful and functional
              environments.
            </p>

            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  ref={(el) => (listRef.current[index] = el)}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#c8a97e] text-xl">✔</span>
                  <p className="text-gray-700">{service}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-8 md:text-left text-center">
              <button
                className="
                  px-8 py-3
                  rounded-lg
                  text-white
                  font-semibold
                  bg-gradient-to-r from-[#f0a844] to-[#a78b64]
                  shadow-lg
                  transform transition
                  duration-300
                  hover:scale-105
                  hover:from-[#ecb260] hover:to-[#c4a06e]
                  focus:outline-none
                "
              >
                View All Services
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceSection;