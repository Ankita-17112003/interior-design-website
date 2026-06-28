import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import FilterButtons from "./FilterButtons";
import MediaGrid from "./MediaGrid";
import LightboxViewer from "./LightboxViewer";

const LIMIT = 12;

const ProjectsGallery = () => {
  const { service, subservice } = useParams();

  const [activeFilter, setActiveFilter] = useState("all");
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const normalize = (text) => text?.toLowerCase().trim().replace(/\s+/g, "-");

  // FETCH with pagination
  const fetchProjects = useCallback(
    async (pageNum = 1, reset = false, signal) => {
      try {
        if (pageNum === 1) setInitialLoading(true);
        else setLoadingMore(true);

        const url =
          service && subservice
            ? `http://localhost:5000/api/projects/${service}/${subservice}?page=${pageNum}&limit=${LIMIT}`
            : `http://localhost:5000/api/projects?page=${pageNum}&limit=${LIMIT}`;

        const res = await axios.get(url, { signal });

        const { projects, hasMore: more } = res.data;

        setMedia((prev) =>
          reset || pageNum === 1 ? projects : [...prev, ...projects],
        );
        setHasMore(more);
        setPage(pageNum);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        console.log(err);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
      }
    },
    [service, subservice],
  );

  // Initial fetch
  // useEffect(() => {
  //   fetchProjects(1, true);
  // }, [fetchProjects]);

  useEffect(() => {
    const controller = new AbortController();

    setActiveFilter("all");
    fetchProjects(1, true, controller.signal);

    return () => controller.abort();
  }, [service, subservice]);

  // Reset when URL changes
  useEffect(() => {
    setActiveFilter("all");
    fetchProjects(1, true);
  }, [service, subservice]);

  // FILTER LOGIC
  useEffect(() => {
    if (!media.length) return;

    let filtered = [...media];

    if (service && subservice) {
      filtered = filtered.filter(
        (item) =>
          normalize(item.category) === normalize(service) &&
          normalize(item.subcategory) === normalize(subservice),
      );
    }

    if (activeFilter !== "all") {
      filtered = filtered.filter((item) => item.type === activeFilter);
    }

    setFilteredMedia(filtered);
  }, [media, service, subservice, activeFilter]);

  // Load More
  const handleLoadMore = () => {
    fetchProjects(page + 1, false);
  };

  // LIGHTBOX
  const openLightbox = (item) => {
    const index = filteredMedia.findIndex((i) => i._id === item._id);
    setCurrentIndex(index >= 0 ? index : 0);
    setLightboxOpen(true);
  };

  const nextItem = () =>
    setCurrentIndex((p) => (p < filteredMedia.length - 1 ? p + 1 : p));
  const prevItem = () => setCurrentIndex((p) => (p > 0 ? p - 1 : p));

  return (
    <>
      <section id="project-gallery" className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 ">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide font-playfair ">
              Projects Gallery
            </h2>
          </div>

          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Loading skeleton */}
          {initialLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-stone-200 animate-pulse aspect-[4/3]"
                />
              ))}
            </div>
          ) : (
            <MediaGrid items={filteredMedia} onItemClick={openLightbox} />
          )}

          {/* Load More button */}
          {!initialLoading && hasMore && activeFilter === "all" && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loadingMore ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>Load More Projects</>
                )}
              </button>
            </div>
          )}

          {/* Total count */}
          {!initialLoading && filteredMedia.length > 0 && (
            <p className="text-center text-stone-400 text-sm mt-6">
              Showing {filteredMedia.length} projects
            </p>
          )}
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
