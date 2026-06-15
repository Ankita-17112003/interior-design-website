import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminServices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");

      console.log("Services Response:", res.data);

      setData(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async () => {
    try {
      await api.post("/services", {
        title: "New Service",
      });

      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Services</h2>

      <button
        onClick={addService}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Service
      </button>

      {data.length === 0 ? (
        <p>No Services Found</p>
      ) : (
        data.map((service) => (
          <div
            key={service._id}
            className="border p-3 mb-2 flex justify-between items-center"
          >
            <p>{service.title}</p>

            <button
              onClick={() => deleteService(service._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminServices;