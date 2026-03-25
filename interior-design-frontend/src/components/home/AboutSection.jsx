import { Link } from "react-router-dom";
import img from "../../assets/img1.jpg";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function AboutSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Image animation (left → right)
      tl.from(imgRef.current, {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })

        // Text animation
        .from(
          textRef.current.children,
          {
            x: 80,
            opacity: 0,
            duration: 1.6,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.6",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 pt-4   gap-14 items-center">
        {/* Image */}
        <div ref={imgRef} className="relative group">
          <img
            src={img}
            alt="Interior Design"
            className="w-full h-[260px] md:h-[420px] object-cover rounded-xl shadow-xl transition duration-500 group-hover:scale-105"
          />

          <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-orange-200 blur-3xl opacity-40 rounded-full"></div>
        </div>

        {/* Text */}
        <div ref={textRef} className="space-y-5 max-w-md">
          <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-gray-900 leading-tight font-[Playfair_Display]">
            Welcome
            <span className="text-black-500"> To </span>
           <span className="text-orange-500"> Chandak </span>
            <span className="block text-orange-500 ">And Associates</span>
          </h2>

          <p className="text-orange-700 text-base md:text-lg leading-relaxed font-title">
           Your best partner for Interior Firm
           
          </p>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We have a Top-class professional interior designers firm in Pune. Chandak And Associates provides the best interior design with the expectations & by considering proper requirements by selecting a quality material. get a friendly budget and affordable Home interiors service matched by Chandak And Associates in pune.
          </p>

          <Link to="/about">
            <button className="mt-3 px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg">
              Discover More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
