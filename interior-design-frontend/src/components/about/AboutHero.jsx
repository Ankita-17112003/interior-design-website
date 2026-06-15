// components/sections/Hero.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        x: "100%",
        duration: 1.5,
        ease: "power3.inOut",
      });

      tl.from(
        imageRef.current,
        {
          scale: 1.2,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1",
      );

      tl.from(
        textRef.current.children,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      tl.from(
        lineRef.current,
        {
          width: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Disable parallax on mobile for better performance
      if (window.innerWidth > 768) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(textRef.current, {
          y: 100,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    // Handle resize events
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-stone-950"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div ref={imageRef} className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Minimalist interior design"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Mobile: darker overlay, Desktop: gradient */}
          <div className="absolute inset-0 bg-black/70 md:bg-gradient-to-r md:from-stone-950 md:via-stone-950/70 md:to-transparent" />
        </div>
      </div>

      {/* Initial Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-stone-950 z-20" />

      {/* Content - Added responsive padding for all screen sizes */}
      <div className="relative z-30 h-full flex items-center justify-center md:justify-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-24 sm:pt-28 md:pt-32 lg:pt-36">
          <div ref={textRef} className="max-w-3xl text-center md:text-left">
            {/* Decorative line - visible on all screens with proper positioning */}
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 mb-3 md:mb-6">
              <div
                ref={lineRef}
                className="w-4 md:w-12 lg:w-16 h-px bg-orange-500"
              />
              <span className="text-orange-500 text-xs tracking-[0.3em] uppercase">
                Since 2010
              </span>
            </div>

            {/* Main headline - responsive text sizes */}
            <h1 className="text-white mb-3 md:mb-4">
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-stone-400 bg-clip-text text-transparent">
                Welcome To
              </span>
              <span className="relative inline-block mt-1">
                <span className="relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-500">
                  Chandak & Associates
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500/20 blur-md" />
              </span>
            </h1>

            {/* Updated Description - fully responsive with shorter mobile version */}
            <p className="text-sm sm:text-base md:text-lg text-stone-300 mb-5 md:mb-8 leading-relaxed max-w-2xl font-light border-l-2 md:border-l-4 border-orange-500 pl-3 md:pl-4 mx-auto md:mx-0">
              <span className="hidden sm:inline">
                Creating exceptional living spaces that blend timeless elegance
                with modern functionality. Each project reflects our commitment
                to craftsmanship, attention to detail, and personalized design
                solutions.
              </span>
              <span className="sm:hidden">
                Timeless elegance meets modern functionality. Crafting
                personalized spaces with exceptional attention to detail.
              </span>
            </p>

            {/* Stats - responsive layout */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="text-center min-w-[80px] sm:min-w-[100px]">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  200
                  <span className="text-orange-500 text-sm sm:text-base ml-1">
                    +
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mt-1 leading-tight">
                  Projects <br className="block xs:hidden" />
                  Completed
                </div>
              </div>
              <div className="text-center min-w-[80px] sm:min-w-[100px]">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  200
                  <span className="text-orange-500 text-sm sm:text-base ml-1">
                    +
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mt-1 leading-tight">
                  Happy <br className="block xs:hidden" />
                  Clients
                </div>
              </div>
              <div className="text-center min-w-[80px] sm:min-w-[100px]">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  15
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-400 mt-1 leading-tight">
                  Years <br className="block xs:hidden" />
                  Experience
                </div>
              </div>
            </div>

            {/* CTA buttons - stacked on mobile, row on desktop */}
            <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-3">
              <Link
                to="/"
                className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-orange-500 text-white font-medium overflow-hidden rounded-none transition-all duration-300 hover:bg-orange-600 text-xs sm:text-sm block w-fit"
              >
                <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                  Explore Our Story
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>

              <Link to = "/projects" className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-white font-medium overflow-hidden rounded-none transition-all duration-300 text-xs sm:text-sm">
                <span className="absolute inset-0 border-2 border-white/30 group-hover:border-white transition-colors" />
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 group-hover:text-stone-900 transition-colors">
                  View Projects
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile, visible on desktop */}
      <div className="hidden md:block absolute bottom-6 right-6 z-30">
        <div className="flex items-center gap-2 text-white/40 rotate-90 origin-bottom-right">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-10 h-px bg-white/20">
            <div className="w-3 h-full bg-orange-500 animate-[scroll_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      {/* Mobile scroll indicator - simple arrow */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[8px] text-white/40 tracking-widest uppercase">
            Scroll
          </span>
          <svg
            className="w-4 h-4 text-white/40 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7-7-7m14-6l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Side decoration - hidden on mobile */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 z-30">
        <div className="flex flex-col items-center gap-3">
          <span className="text-white/20 text-[10px] uppercase tracking-widest rotate-90 mb-6">
            Follow Us
          </span>
          <div className="h-16 w-px bg-white/20" />
          <div className="flex flex-col gap-3">
            {["ig", "pt", "ln"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/30 hover:text-orange-500 transition-colors rotate-90 text-xs"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile bottom padding for safe area */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-stone-950 to-transparent pointer-events-none md:hidden" />

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(200%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Extra small devices */
        @media (min-width: 375px) {
          .xs\\:flex-row {
            flex-direction: row;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutHero;
