import { useEffect, useState } from "react";
import api from "../../api/axios";
import Swal from "sweetalert2";

const AdminContacts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts");
      setData(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id, name) => {
    // Confirmation popup
    const result = await Swal.fire({
      title: "Delete Contact Message?",
      html: `Are you sure you want to delete message from <strong>${name}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await api.delete(`/contacts/${id}`);
        
        // Remove from UI
        setData(data.filter((contact) => contact._id !== id));
        
        // Success popup
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Contact message has been deleted.",
          confirmButtonColor: "#f97316",
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.response?.data?.message || "Something went wrong. Please try again.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold text-gray-800">
           Contact Messages
        </h2>

        {/* COUNT CARD */}
        <div className="bg-white px-4 py-2 rounded-xl shadow border">
          <p className="text-sm text-gray-500">Total Contacts</p>
          <p className="text-2xl font-bold text-blue-600">
            {data.length}
          </p>
        </div>

      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {data.map((c, index) => (
          <div
            key={c._id}
            className="rounded-2xl shadow-lg p-5 bg-white border-t-4 transition transform hover:-translate-y-1 hover:shadow-2xl relative group"
            style={{
              borderTopColor:
                index % 3 === 0
                  ? "#8b5cf6"
                  : index % 3 === 1
                  ? "#ec4899"
                  : "#3b82f6",
            }}
          >

            {/* INDEX & DELETE BUTTON */}
            <div className="flex justify-between mb-3">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                New
              </span>

              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-400">
                  #{index + 1}
                </span>
                
                {/* Delete Button - Icon */}
                <button
                  onClick={() => handleDelete(c._id, c.name)}
                  disabled={loading}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                  title="Delete message"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* NAME */}
            <p className="text-lg font-bold text-gray-900">
              👤 {c.name}
            </p>

            {/* EMAIL */}
            <p className="text-sm text-blue-600">
              📧 {c.email}
            </p>

            {/* NUMBER */}
            <p className="text-sm text-green-600 mb-2">
              📞 {c.number || c.phone || "Not provided"}
            </p>

            {/* MESSAGE */}
            <p className="text-gray-700 text-sm bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg">
              {c.message}
            </p>

          </div>
        ))}

      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          
          <p className="text-gray-500 text-lg">No contact messages yet.</p>
        </div>
      )}

    </div>
  );
};

export default AdminContacts;