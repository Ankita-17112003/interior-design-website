import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mediaType, setMediaType] = useState("image"); // "image" or "youtube"
  const [form, setForm] = useState({
    title: "", location: "", category: "", subcategory: "", youtubeUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects/all");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("location", form.location);
      fd.append("category", form.category);
      fd.append("subcategory", form.subcategory);

      if (mediaType === "youtube") {
        fd.append("youtubeUrl", form.youtubeUrl);
      } else {
        if (!imageFile) return alert("Image select karo");
        fd.append("file", imageFile);
      }

      await api.post("/projects", fd);
      setForm({ title: "", location: "", category: "", subcategory: "", youtubeUrl: "" });
      setImageFile(null);
      setShowForm(false);
      fetchProjects();

      Swal.fire({ title: "Added!", icon: "success", timer: 1500, showConfirmButton: false });
    } catch (error) {
      console.log(error);
      Swal.fire({ title: "Error!", text: error.message, icon: "error" });
    } finally { setSubmitting(false); }
  };

  const deleteProject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This project will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ title: "Error!", text: "Something went wrong.", icon: "error" });
    }
  };

  const inputStyle = {
    width: "100%", padding: "8px 12px",
    border: "1px solid #ddd", borderRadius: "6px",
    fontSize: "13px", outline: "none", boxSizing: "border-box",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700 }}>Projects</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ background: "#f97316", color: "#fff", padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: 600 }}
        >
          {showForm ? "✕ Cancel" : "+ Add Project"}
        </button>
      </div>

      {/* ADD FORM */}
      {showForm && (
        <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h3 style={{ fontWeight: 700, marginBottom: "16px" }}>New Project</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#666", display: "block", marginBottom: "4px" }}>TITLE *</label>
                <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Modern 2BHK" />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#666", display: "block", marginBottom: "4px" }}>LOCATION</label>
                <input style={inputStyle} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Pune" />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#666", display: "block", marginBottom: "4px" }}>CATEGORY *</label>
                <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required placeholder="residential" />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#666", display: "block", marginBottom: "4px" }}>SUBCATEGORY *</label>
                <input style={inputStyle} value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} required placeholder="2-bhk" />
              </div>
            </div>

            {/* Media type toggle */}
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, color: "#666", display: "block", marginBottom: "8px" }}>MEDIA TYPE *</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setMediaType("image")}
                  style={{
                    padding: "8px 20px", borderRadius: "20px", border: "1px solid #ddd", cursor: "pointer",
                    background: mediaType === "image" ? "#f97316" : "#fff",
                    color: mediaType === "image" ? "#fff" : "#555",
                    fontWeight: 600, fontSize: "12px",
                  }}
                >
                  📷 Image (Cloudinary)
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType("youtube")}
                  style={{
                    padding: "8px 20px", borderRadius: "20px", border: "1px solid #ddd", cursor: "pointer",
                    background: mediaType === "youtube" ? "#ff0000" : "#fff",
                    color: mediaType === "youtube" ? "#fff" : "#555",
                    fontWeight: 600, fontSize: "12px",
                  }}
                >
                  ▶ YouTube Video
                </button>
              </div>
            </div>

            {/* Image upload */}
            {mediaType === "image" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#666", display: "block", marginBottom: "4px" }}>IMAGE FILE *</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{ fontSize: "13px", color: "#555" }} />
              </div>
            )}

            {/* YouTube URL */}
            {mediaType === "youtube" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "#666", display: "block", marginBottom: "4px" }}>YOUTUBE URL *</label>
                <input
                  style={inputStyle}
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                  required
                  placeholder="https://www.youtube.com/watch?v=xxxxxxxx"
                />
                <p style={{ fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
                  YouTube video ka full URL paste karo
                </p>
              </div>
            )}

            <button type="submit" disabled={submitting} style={{
              background: "#f97316", color: "#fff", padding: "10px 24px",
              border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600,
            }}>
              {submitting ? "Saving..." : "Save Project"}
            </button>
          </form>
        </div>
      )}

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden border">

            {/* Thumbnail */}
            {project.type === "youtube" ? (
              <div style={{ position: "relative", height: "112px", background: "#000" }}>
                <img
                  src={`https://img.youtube.com/vi/${project.youtubeUrl?.match(/[?&]v=([^&]+)/)?.[1]}/mqdefault.jpg`}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ background: "#ff0000", color: "#fff", borderRadius: "4px", padding: "4px 8px", fontSize: "16px" }}>▶</span>
                </div>
              </div>
            ) : (
              <img src={project.src} alt={project.title} className="w-full h-28 object-cover" />
            )}

            <div className="p-2">
              <h3 className="font-semibold text-sm">{project.title}</h3>
              <p className="text-gray-500 text-[10px]">{project.location}</p>
              <p className="text-gray-600 text-[10px]">{project.category} / {project.subcategory}</p>
              <div className="flex gap-1 mt-2">
                <button className="bg-blue-600 text-white px-2 py-1 text-[10px] rounded" onClick={() => navigate(`/admin/projects/edit/${project._id}`)}>
                  Edit
                </button>
                <button className="bg-red-600 text-white px-2 py-1 text-[10px] rounded" onClick={() => deleteProject(project._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;