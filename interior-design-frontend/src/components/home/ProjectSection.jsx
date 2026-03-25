import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // for navigation
import gsap from "gsap";

import project1 from "../../assets/img1.jpg";
import project2 from "../../assets/img2.jpg";
import project3 from "../../assets/img3.jpg";
import project4 from "../../assets/img1.jpg";
import project5 from "../../assets/img2.jpg";

const ProjectsSection = () => {
  const containerRef = useRef(null);

  const projects = [
    { img: project1, title: "Modern Living Room" },
    { img: project2, title: "Office Workspace" },
    { img: project3, title: "Cozy Bedroom" },
    { img: project4, title: "Restaurant Interior" },
    { img: project5, title: "Luxury Kitchen" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = containerRef.current.scrollWidth;
      gsap.to(containerRef.current, {
        x: () => `-${totalWidth / 2}px`, // scroll half (duplicate for loop)
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Duplicate projects array for seamless scroll
  const allProjects = [...projects, ...projects];

  return (
    <section className="py-20 bg-[#f8f6f2] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 ">
          Our Projects
        </h2>

        {/* Horizontal Scrolling Projects */}
        <div className="flex gap-6 w-max mb-8" ref={containerRef}>
          {allProjects.map((project, index) => (
            <div
              key={index}
              className="min-w-[250px] flex-shrink-0 relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-center px-3">
                <h3 className="font-semibold text-lg">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <Link
            to="/projects"
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
            View All Projects
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;