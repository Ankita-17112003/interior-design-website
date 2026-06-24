import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import mainServices from "../data/servicesData";

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");
const slugToLabel = (slug) =>
  slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

// Extract YouTube video ID from URL
const getYoutubeId = (url) => {
  if (!url) return null;
  const normalMatch = url.match(/[?&]v=([^&]+)/);
  if (normalMatch) return normalMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];
  const shortsMatch = url.match(/\/shorts\/([^?]+)/);
  if (shortsMatch) return shortsMatch[1];
  return null;
};

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const youtubeId = getYoutubeId(project.youtubeUrl);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px", overflow: "hidden", background: "#fff",
        border: "1px solid #f0ece6",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease", cursor: "pointer",
      }}
    >
      <div style={{ overflow: "hidden", height: "220px", position: "relative" }}>

        {/* YouTube video */}
        {project.type === "youtube" && youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&rel=0`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none", display: "block" }}
          />
        ) : (
          /* Cloudinary Image */
          <img
            src={project.src}
            alt={project.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.4s ease",
            }}
          />
        )}

        {/* YouTube badge */}
        {project.type === "youtube" && (
          <div style={{
            position: "absolute", top: "10px", right: "10px",
            background: "#ff0000", color: "#fff",
            fontSize: "10px", fontWeight: 700,
            padding: "3px 8px", borderRadius: "4px",
            letterSpacing: "0.05em",
          }}>
            ▶ YouTube
          </div>
        )}
      </div>

      <div style={{ padding: "16px 18px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px" }}>
          {project.title}
        </h3>
        {project.location && (
          <span style={{ fontSize: "12px", color: "#888" }}>📍 {project.location}</span>
        )}
      </div>
    </div>
  );
};

const Services = () => {
  const { service, subservice } = useParams();
  const navigate = useNavigate();
  const projectsRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (service && subservice) {
      setSelected({ serviceId: service, subservice: slugToLabel(subservice) });
    }
  }, [service, subservice]);

  useEffect(() => {
    if (!selected) { setProjects([]); return; }
    const fetchProjects = async () => {
      setLoading(true); setError("");
      try {
        const res = await fetch(`http://localhost:3000/api/projects/${selected.serviceId}/${slugify(selected.subservice)}`);
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load projects.");
        setProjects([]);
      } finally { setLoading(false); }
    };
    fetchProjects();
  }, [selected]);

  useEffect(() => {
    if (selected && projectsRef.current) {
      setTimeout(() => projectsRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [selected]);

  return (
    <div ref={projectsRef} style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fdfaf7", minHeight: "100vh", padding: "100px 24px 80px" }}>

      {selected ? (
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <p style={{ fontSize: "12px", color: "#f97316", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                {mainServices.find(s => s.id === selected.serviceId)?.name} › {selected.subservice}
              </p>
              <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a1a", margin: 0 }}>
                {selected.subservice} Projects{" "}
                {!loading && <span style={{ fontSize: "16px", fontWeight: 400, color: "#aaa" }}>({projects.length})</span>}
              </h2>
            </div>
            <button
              onClick={() => { setSelected(null); setProjects([]); navigate("/services", { replace: true }); }}
              style={{ padding: "8px 20px", borderRadius: "20px", border: "1px solid #e5e7eb", background: "#fff", color: "#888", fontSize: "13px", cursor: "pointer" }}
            >
              ✕ Clear
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ width: "40px", height: "40px", border: "3px solid #f0ece6", borderTop: "3px solid #f97316", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
              <p style={{ color: "#aaa", fontSize: "14px" }}>Loading projects...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}>
              <p>{error}</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && projects.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏗️</div>
              <p style={{ fontSize: "15px" }}>No projects found for <strong>{selected.subservice}</strong> yet.</p>
            </div>
          )}

        </div>
      ) : (
  <div style={{ textAlign: "center", padding: "80px 24px", color: "#aaa" }}>

    <p style={{ fontSize: "16px", color: "#888" }}>
      {window.innerWidth < 768 ? (
        <>Tap the menu icon (☰) above and select <strong>Our Services</strong> to explore</>
      ) : (
        <>Hover on <strong>Services</strong> in the navbar and select a subservice</>
      )}
    </p>
  </div>

      )}
    </div>
  );
};

export default Services;