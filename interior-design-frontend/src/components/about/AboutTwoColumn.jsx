import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImg from "../../assets/img2.jpg"; // Replace with your image

gsap.registerPlugin(ScrollTrigger);

const AboutTwoColumn = () => {
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.from([textRef.current, imgRef.current], {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section className="bg-[#f5f1eb] py-16 px-6 md:px-16 flex flex-col md:flex-row items-center gap-10">
      {/* Image */}
      <div ref={imgRef} className="w-full md:w-1/2 flex justify-center">
        <img
          src={aboutImg}
          alt="Interior"
          className="w-full md:w-[90%] rounded-lg shadow-lg"
        />
      </div>

      {/* Text */}
      <div ref={textRef} className="w-full md:w-1/2">
        <h2 className="text-3xl font-serif mb-4 text-gray-900">
          Our Vision & Style
        </h2>
        <p className="text-gray-800 text-lg leading-relaxed">
          With a vision that fuses mountain charm and modern elegance, we create
          interiors that feel like home, grounded in the beauty of natural
          materials. Every space is designed to be timeless, functional, and
          deeply personal, reflecting the lifestyle and personality of its
          inhabitants.
        </p>
      </div>
    </section>
  );
};

export default AboutTwoColumn;