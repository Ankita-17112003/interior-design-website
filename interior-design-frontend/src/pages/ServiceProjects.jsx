import { useParams } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Modern 2 BHK Interior",
    service: "residential",
    subservice: "2-bhk",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80",
  },
  {
    id: 2,
    title: "Luxury Villa Design",
    service: "residential",
    subservice: "villa",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80",
  },
  {
    id: 3,
    title: "Office Interior",
    service: "commercial",
    subservice: "office-interior",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80",
  },
];

const ServiceProjects = () => {
  const { service, subservice } = useParams();

  const filtered = projects.filter(
    (p) => p.service === service && p.subservice === subservice
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textTransform: "capitalize" }}>
        {subservice?.replace("-", " ")}
      </h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd" }}>
            <img src={p.image} style={{ width: "100%" }} />
            <h3>{p.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceProjects;