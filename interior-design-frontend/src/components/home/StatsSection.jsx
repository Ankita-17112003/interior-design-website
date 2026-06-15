import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    numberRefs.current.forEach((el) => {
      const target = +el.getAttribute("data-target");

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          onUpdate: function () {
            el.innerText = Math.ceil(el.innerText) + "+";
          },
        }
      );
    });
  }, []);

  const stats = [
    { number: 200, title: "Projects Completed" },
    { number: 200, title: "Happy Clients" },
    { number: 10, title: "Years Experience" },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold font-playfair text-center mb-12">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <h3
                ref={(el) => (numberRefs.current[index] = el)}
                data-target={item.number}
                className="text-4xl font-bold text-[#c8a97e]"
              >
                0
              </h3>

              <p className="mt-3 text-gray-600 font-medium">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default StatsSection;