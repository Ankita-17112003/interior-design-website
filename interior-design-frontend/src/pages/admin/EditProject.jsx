import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Swal from "sweetalert2";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", location: "", category: "", subcategory: "",
    src: "", youtubeUrl: "", type: "",
  });
  const [mediaType, setMediaType] = useState("image"); // "image" or "youtube"
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setForm(res.data);
        // Set media type based on existing project
        setMediaType(res.data.type === "youtube" ? "youtube" : "image");
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("subcategory", form.subcategory);

      if (mediaType === "youtube") {
        formData.append("youtubeUrl", form.youtubeUrl);
      } else if (file) {
        formData.append("file", file);
      }

      await api.put(`/projects/${id}`, formData);

      Swal.fire({ icon: "success", title: "Updated Successfully", timer: 1500, showConfirmButton: false });
      navigate("/admin/projects");
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      Swal.fire({ icon: "error", title: "Update Failed" });
    }
  };

  const inputClass = "w-full border border-gray-300 p-2 rounded text-sm outline-none focus:border-orange-400";

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6">Edit Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">TITLE</label>
          <input name="title" value={form.title} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-1">LOCATION</label>
          <input name="location" value={form.location} onChange={handleChange} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">CATEGORY</label>
            <input name="category" value={form.category} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">SUBCATEGORY</label>
            <input name="subcategory" value={form.subcategory} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* Media type toggle */}
        <div>
          <label className="text-xs font-semibold text-gray-500 block mb-2">MEDIA TYPE</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMediaType("image")}
              style={{
                padding: "8px 20px", borderRadius: "20px",
                border: "1px solid #ddd", cursor: "pointer",
                background: mediaType === "image" ? "#f97316" : "#fff",
                color: mediaType === "image" ? "#fff" : "#555",
                fontWeight: 600, fontSize: "12px",
              }}
            >
              📷 Image
            </button>
            <button
              type="button"
              onClick={() => setMediaType("youtube")}
              style={{
                padding: "8px 20px", borderRadius: "20px",
                border: "1px solid #ddd", cursor: "pointer",
                background: mediaType === "youtube" ? "#ff0000" : "#fff",
                color: mediaType === "youtube" ? "#fff" : "#555",
                fontWeight: 600, fontSize: "12px",
              }}
            >
              ▶ YouTube
            </button>
          </div>
        </div>

        {/* Image upload */}
        {mediaType === "image" && (
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-2">IMAGE</label>
            {form.src && (
              <img src={form.src} className="w-32 h-20 object-cover rounded mb-2" alt="current" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm text-gray-500"
            />
            <p className="text-xs text-gray-400 mt-1">Naya image select karo ya blank chhodo same rakhne ke liye</p>
          </div>
        )}

        {/* YouTube URL */}
        {mediaType === "youtube" && (
          <div>
            <label className="text-xs font-semibold text-gray-500 block mb-1">YOUTUBE URL</label>
            <input
              name="youtubeUrl"
              value={form.youtubeUrl || ""}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://www.youtube.com/watch?v=xxxxxxxx"
            />
            <p className="text-xs text-gray-400 mt-1">YouTube video ka full URL paste karo</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition"
        >
          Update Project
        </button>

      </form>
    </div>
  );
};

export default EditProject;