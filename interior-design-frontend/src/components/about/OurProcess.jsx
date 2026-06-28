// components/about/OurProcess.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const OurProcess = () => {
  const sectionRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const timelineRef = useRef(null);
  const stepsRef = useRef([]);

  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We begin by understanding your vision, lifestyle, and requirements through in-depth consultations.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: "from-orange-300 to-orange-400",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      number: "02",
      title: "Concept Development",
      description: "Our team creates mood boards, sketches, and 3D renderings to bring your ideas to life.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "from-orange-400 to-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      number: "03",
      title: "Design & Planning",
      description: "Detailed architectural drawings, material selection, and budget planning are finalized.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      number: "04",
      title: "Execution",
      description: "Skilled craftsmen bring the design to life with precision and attention to detail.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: "from-orange-600 to-orange-700",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-700",
    },
    {
      number: "05",
      title: "Styling & Handover",
      description: "Final touches, styling, and a thorough walkthrough ensure your complete satisfaction.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: "from-orange-700 to-orange-800",
      bgColor: "bg-stone-100",
      iconColor: "text-orange-800",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      titleTl
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(headingRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(descRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");

      gsap.from(timelineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1
        },
        scaleX: 0,
        transformOrigin: "left",
        ease: "none"
      });

      stepsRef.current.forEach((step, index) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.2)"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/40 overflow-hidden">
      {/* Background Decorative Elements — orange only, on-brand */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-delayed" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            ref={subtitleRef}
            className="font-poppins text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-medium"
          >
            Our Approach
          </span>
          <h2
            ref={headingRef}
            className="font-playfair text-4xl sm:text-5xl text-stone-900 mb-6"
          >
            The Creative Process
          </h2>
          <p
            ref={descRef}
            className="font-poppins text-stone-600 max-w-2xl mx-auto"
          >
            A meticulous journey from concept to completion, ensuring every detail reflects
            your vision and our expertise.
          </p>
        </div>

        {/* Desktop Timeline View */}
        <div className="hidden lg:block relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-100 to-transparent -translate-y-1/2" />

          <div
            ref={timelineRef}
            className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 -translate-y-1/2 origin-left shadow-lg shadow-orange-200"
          />

          <div className="relative flex justify-between">
            {processSteps.map((step, index) => (
              <div
                key={index}
                ref={el => stepsRef.current[index] = el}
                className="relative flex flex-col items-center text-center w-48 group"
              >
                <div className="relative mb-6">
                  <div className={`
                    absolute inset-0 rounded-full bg-gradient-to-br ${step.color}
                    blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300
                  `} />
                  <div className={`
                    relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${step.color}
                    text-white flex items-center justify-center text-2xl font-bold
                    shadow-xl shadow-orange-200/60 group-hover:scale-110 group-hover:shadow-2xl
                    transition-all duration-500 cursor-pointer border-4 border-white
                  `}>
                    {step.number}
                  </div>
                </div>

                <div className={`
                  mb-4 p-3 rounded-xl ${step.bgColor}
                  group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300
                `}>
                  <div className={step.iconColor}>
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-playfair text-xl font-semibold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>

                <p className="font-poppins text-sm text-stone-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Stacked View */}
        <div className="lg:hidden space-y-6">
          {processSteps.map((step, index) => (
            <div
              key={index}
              ref={el => stepsRef.current[index] = el}
              className="relative group"
            >
              <div className="relative bg-white rounded-2xl shadow-lg shadow-orange-100 hover:shadow-2xl hover:shadow-orange-200 transition-all duration-500 overflow-hidden border border-orange-100">
                <div className={`
                  absolute inset-0 bg-gradient-to-r ${step.color} opacity-0
                  group-hover:opacity-5 transition-opacity duration-500
                `} />

                <div className="relative p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`
                      relative w-14 h-14 rounded-full bg-gradient-to-br ${step.color}
                      text-white flex items-center justify-center font-bold text-lg
                      shadow-lg shadow-orange-200/60 group-hover:scale-110 group-hover:rotate-6
                      transition-all duration-500 border-2 border-white
                    `}>
                      {step.number}
                    </div>

                    <div className="flex-1 flex items-center gap-3">
                      <div className={`
                        p-2 rounded-lg ${step.bgColor}
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <div className={step.iconColor}>
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="font-playfair text-xl font-semibold text-stone-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-poppins text-stone-600 pl-2">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < processSteps.length - 1 && (
                <div className="relative flex justify-center py-2">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-poppins font-medium overflow-hidden shadow-xl shadow-orange-300/50 hover:shadow-2xl hover:shadow-orange-400/50 transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10">Start Your Journey</span>
            <svg className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

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

export default OurProcess;