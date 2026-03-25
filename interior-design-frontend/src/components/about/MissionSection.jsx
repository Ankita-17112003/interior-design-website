import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = ({ title, text1, text2, image }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from(sectionRef.current, {
      opacity: 0,
      x: -100,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
    >
      <div>
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-red-600 mb-4 leading-relaxed">{text1}</p>
        <p className="text-red-600 leading-relaxed">{text2}</p>
      </div>
      <div>
        <img
          src={image}
          alt="Mission"
          className="rounded-xl shadow-lg w-full object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default MissionSection;