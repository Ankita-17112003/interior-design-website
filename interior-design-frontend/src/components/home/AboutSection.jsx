import { Link } from "react-router-dom";
import img from "../../assets/img6.jpg";
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
  className="py-12 sm:py-16 md:py-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
>
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
    {/* Image */}
    <div ref={imgRef} className="relative group">
      <img
        src={img}
        alt="Interior Design"
        className="w-full h-[260px] md:h-[420px] object-cover rounded-xl shadow-xl transition duration-500 group-hover:scale-105"
      />

      <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-44 md:h-44 bg-orange-200 blur-3xl opacity-40 rounded-full -z-10"></div>
    </div>

    {/* Text */}
    <div ref={textRef} className="space-y-4 sm:space-y-5 max-w-md mx-auto text-center md:text-left">
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-semibold text-gray-900 leading-tight font-[Playfair_Display]">
        Welcome
        <span className="text-gray-900"> To </span>
        <span className="text-orange-500"> Chandak </span>
        <span className="block text-orange-500">And Associates</span>
      </h2>

      <p className="text-orange-600 text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase">
        Your Best Partner for Interior Design
      </p>

      <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-justify">
        We have a top-class professional interior designers firm in Pune. Chandak
        And Associates provides the best interior design matching your
        expectations, by considering proper requirements and selecting quality
        materials. Get a friendly, budget-affordable home interior service from
        Chandak And Associates in Pune.
      </p>

      <div className="flex justify-center md:justify-start">
        <Link to="/about">
          <button className="mt-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm sm:text-base transition duration-300 shadow-md hover:shadow-lg">
            Discover More
          </button>
        </Link>
      </div>
    </div>
  </div>
</section>
  );
}

export default AboutSection;
