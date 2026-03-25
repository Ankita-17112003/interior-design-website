// components/ProjectsGallery.jsx
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectMedia } from "../../data/projectsData";
import FilterButtons from "./FilterButtons";
import MediaGrid from "./MediaGrid";
import LightboxViewer from "./LightboxViewer";

gsap.registerPlugin(ScrollTrigger);

const ProjectsGallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredMedia, setFilteredMedia] = useState(projectMedia);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryRef = useRef(null);
  const headerRef = useRef(null);

  // Filter media
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredMedia(projectMedia);
    } else {
      setFilteredMedia(
        projectMedia.filter((item) => item.type === activeFilter),
      );
    }
  }, [activeFilter]);

  // GSAP animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  // Open lightbox
  const openLightbox = (item) => {
    const index = filteredMedia.findIndex((i) => i.id === item.id);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Navigation
  const nextItem = () => {
    setCurrentIndex((prev) =>
      prev < filteredMedia.length - 1 ? prev + 1 : prev,
    );
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const imageCount = projectMedia.filter(
    (item) => item.type === "image",
  ).length;
  const videoCount = projectMedia.filter(
    (item) => item.type === "video",
  ).length;

  return (
    <>
      <section
        ref={galleryRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <span className="text-orange-500 text-sm tracking-[0.3em] uppercase mb-4 block font-['Poppins']">
              Our Portfolio
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl text-stone-900 mb-4">
              Projects Gallery
            </h2>
            <p className="font-['Poppins'] text-stone-600 max-w-2xl mx-auto text-base sm:text-lg">
              Explore our curated collection of interior design projects, from
              stunning photographs to immersive video tours of our finest work.
            </p>

            
          </div>

          {/* Filters */}
          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Grid */}
          <MediaGrid items={filteredMedia} onItemClick={openLightbox} />

         
        </div>
      </section>

      {/* Lightbox */}
      <LightboxViewer
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredMedia}
        currentIndex={currentIndex}
        onNext={nextItem}
        onPrev={prevItem}
      />
    </>
  );
};

export default ProjectsGallery;
