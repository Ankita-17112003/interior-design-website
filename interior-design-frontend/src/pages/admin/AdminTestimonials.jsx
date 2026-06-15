import { useEffect, useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";

const AdminTestimonials = () => {
  const [data, setData] = useState([]);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setData(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const deleteItem = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This testimonial will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/testimonials/${id}`);
      setData((prev) => prev.filter((i) => i._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ⭐ STAR FUNCTION
  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        ⭐ Testimonials
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {data.map((t) => (
          <div
            key={t._id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
          >

            {/* MESSAGE */}
            <p className="text-gray-700 text-sm mb-2">
              "{t.message}"
            </p>

            {/* NAME */}
            <p className="font-semibold text-gray-900">
              👤 {t.name}
            </p>

            {/* CITY */}
            <p className="text-gray-500 text-sm mb-2">
              📍 {t.city}
            </p>

            {/* RATING */}
            <div className="flex text-lg mb-3">
              {renderStars(t.rating)}
            </div>

            {/* DELETE */}
            <button
              onClick={() => deleteItem(t._id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminTestimonials;