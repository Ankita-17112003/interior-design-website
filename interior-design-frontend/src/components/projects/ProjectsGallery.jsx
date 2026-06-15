import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import FilterButtons from "./FilterButtons";
import MediaGrid from "./MediaGrid";
import LightboxViewer from "./LightboxViewer";

const ProjectsGallery = () => {
  const { service, subservice } = useParams();

  const [activeFilter, setActiveFilter] = useState("all");
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const normalize = (text) =>
    text?.toLowerCase().trim().replace(/\s+/g, "-");

  // FETCH
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects");
        setMedia(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

  // FILTER LOGIC — URL filter + type filter dono saath kaam karein
  useEffect(() => {
    if (!media.length) return;

    let filtered = [...media];

    // Step 1 — URL filter (category + subcategory)
    if (service && subservice) {
      filtered = filtered.filter((item) =>
        normalize(item.category) === normalize(service) &&
        normalize(item.subcategory) === normalize(subservice)
      );
    }

    // Step 2 — Type filter (image / youtube) — URL filter ke baad bhi apply hoga
    if (activeFilter !== "all") {
      filtered = filtered.filter((item) => item.type === activeFilter);
    }

    setFilteredMedia(filtered);
  }, [media, service, subservice, activeFilter]);

  // Reset filter when URL changes
  useEffect(() => {
    setActiveFilter("all");
  }, [service, subservice]);

  // LIGHTBOX
  const openLightbox = (item) => {
    const index = filteredMedia.findIndex((i) => i._id === item._id);
    setCurrentIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  const nextItem = () => setCurrentIndex((p) => p < filteredMedia.length - 1 ? p + 1 : p);
  const prevItem = () => setCurrentIndex((p) => p > 0 ? p - 1 : p);

  return (
    <>
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Projects Gallery</h2>
          </div>

          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <MediaGrid items={filteredMedia} onItemClick={openLightbox} />
        </div>
      </section>

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