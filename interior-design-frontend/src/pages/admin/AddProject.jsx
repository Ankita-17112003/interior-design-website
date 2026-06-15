import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

const AddProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    category: "",
    subcategory: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle cancel icon click
  const handleCancel = () => {
    Swal.fire({
      icon: "question",
      title: "Cancel adding project?",
      text: "Your entered data will be lost.",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, stay"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin/projects");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "No File Selected",
        text: "Please select an image or video to upload",
        confirmButtonColor: "#f97316",
        confirmButtonText: "OK"
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please select a file smaller than 50MB",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("location", form.location);
      formData.append("category", form.category);
      formData.append("subcategory", form.subcategory);
      formData.append("file", file);

      await api.post("/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Project Added Successfully!",
        text: "Your project has been added to the Website.",
        confirmButtonColor: "#f97316",
        confirmButtonText: "View Projects",
        showCancelButton: true,
        cancelButtonText: "Add Another",
        cancelButtonColor: "#6b7280",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin/projects");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setForm({
            title: "",
            location: "",
            category: "",
            subcategory: "",
          });
          setFile(null);
          const fileInput = document.getElementById("file-input");
          if (fileInput) fileInput.value = "";
        }
      });

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error Adding Project",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Try Again"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow relative">
      {/* Cancel Icon Button - Top Right Corner */}
      <button
        type="button"
        onClick={handleCancel}
        disabled={loading}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Cancel"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-2xl font-bold  mb-6 pr-8">
        Add New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Service (e.g., residential, commercial)"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          name="subcategory"
          placeholder="SubService (e.g., living-room, modular-kitchen)"
          value={form.subcategory}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <div>
          <input
            id="file-input"
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded"
            required
          />
          {file && (
            <p className="text-sm text-green-600 mt-1">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            "Add Project"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProject;