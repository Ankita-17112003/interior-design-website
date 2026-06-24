// components/sections/Story.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import living from "../../assets/living.jpg";
import img from "../../assets/bedroom.jpg";
import imgg from "../../assets/kitchen.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutStory = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Stats animation
      gsap.from(statsRef.current.children, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Image reveal
      gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Quote animation
      gsap.from(quoteRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-100 rounded-full -ml-48 -mb-48 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={textRef} className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="text-orange-500 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase block mb-2">
            Our Story
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-stone-800 mb-3 sm:mb-4">
            Crafting Dreams Into
            <span className="block font-bold text-stone-900 mt-1">
              Tangible Reality
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-orange-500 mx-auto mt-3 sm:mt-4" />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Quote */}
            <div ref={quoteRef} className="relative">
              <svg
                className="absolute -top-4 -left-2 w-8 h-8 sm:w-12 sm:h-12 text-orange-200 opacity-50"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10,8c-3.3,0-6,2.7-6,6v6c0,3.3,2.7,6,6,6h6c3.3,0,6-2.7,6-6v-6c0-3.3-2.7-6-6-6H10z M26,8c-3.3,0-6,2.7-6,6v6c0,3.3,2.7,6,6,6h6c3.3,0,6-2.7,6-6v-6c0-3.3-2.7-6-6-6H26z" />
              </svg>
              <p className="text-base sm:text-lg md:text-xl text-stone-600 italic leading-relaxed pl-6 sm:pl-8">
                "We believe every space has a story to tell, and our mission is
                to help you tell yours through thoughtful, timeless design."
              </p>
            </div>

            {/* Mission text */}
           <div className="space-y-4 sm:space-y-5 text-stone-600 text-sm sm:text-base leading-relaxed text-justify md:text-left relative">
  
  {/* Decorative quote accent */}
  <span className="absolute -top-2 -left-1 text-5xl sm:text-6xl text-orange-200 font-playfair select-none leading-none">
    "
  </span>

  <p className="relative pl-4 border-l-2 border-orange-200">
    Chandak & Interior is a Pune-based company started in 2010. It is a fine
    mixture of architect and interior firm. In a short time, we have
    reached every corner of the city and have satisfied clients with
    innovative ideas and on-time execution. We are into gracing our
    client homes with the style, sophistication, elegance and warmth
    that captures the essence of those who live in them.
  </p>

  <p className="relative pl-4 border-l-2 border-orange-200">
    We understand the value of establishing true lasting
    relationships with our clients, and we embrace the opportunities
    we have to create their dream homes.
  </p>

</div>

            {/* Values */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
              {[
                { icon: '🎯', title: 'Purpose-Driven', desc: 'Design with meaning' },
                { icon: '🌱', title: 'Sustainable', desc: 'Eco-conscious choices' },
                { icon: '❤️', title: 'Heartfelt', desc: 'Spaces with soul' },
              ].map((value, index) => (
                <div 
                  key={index}
                  className="bg-stone-50 p-3 sm:p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 text-center group"
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-stone-800 text-xs sm:text-sm">{value.title}</h3>
                  <p className="text-stone-500 text-[10px] sm:text-xs mt-1">{value.desc}</p>
                </div>
              ))}
            </div> */}

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6"
            >
              {[
                { number: "200+", label: "Projects", sub: "Completed" },
                { number: "200+", label: "Happy", sub: "Clients" },
                { number: "15", label: "Years", sub: "Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-xs font-medium text-stone-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[8px] sm:text-[10px] text-stone-300">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image collage */}
          <div
            ref={imageRef}
            className="relative order-1 lg:order-2 mb-6 lg:mb-0"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Main large image */}
              <div className="col-span-2">
                <div className="relative rounded-lg overflow-hidden shadow-xl group">
                  <img
                    src={living}
                    alt="Modern living room"
                    className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-white">
                    <p className="text-xs sm:text-sm font-light">
                      Modern Living
                    </p>
                    <p className="text-lg sm:text-xl font-bold">
                      2024 Collection
                    </p>
                  </div>
                </div>
              </div>

              {/* Two smaller images */}
              <div className="relative rounded-lg overflow-hidden shadow-lg group">
                <img
                  src={img}
                  alt="Minimalist bedroom"
                  className="w-full h-28 sm:h-32 md:h-36 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-[10px] sm:text-xs">Bedroom</p>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden shadow-lg group">
                <img
                  src={imgg}
                  alt="Luxury kitchen"
                  className="w-full h-28 sm:h-32 md:h-36 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-[10px] sm:text-xs">Kitchen</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-orange-500 text-white p-2 sm:p-3 rounded-lg shadow-xl rotate-6">
              <p className="text-xs sm:text-sm font-bold">15+ Years</p>
              <p className="text-[8px] sm:text-[10px] opacity-90">
                of Excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
