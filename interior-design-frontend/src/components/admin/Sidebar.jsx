import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-5 shadow-lg">
      
      {/* LOGO / TITLE */}
      <h2 className="text-xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
        Admin Panel
      </h2>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/admin/projects" className={linkStyle}>
          📁 Projects
        </NavLink>

        {/* <NavLink to="/admin/services" className={linkStyle}>
          🛠 Services
        </NavLink> */}

        <NavLink to="/admin/testimonials" className={linkStyle}>
          ⭐ Testimonials
        </NavLink>

        <NavLink to="/admin/contacts" className={linkStyle}>
          📩 Contacts
        </NavLink>
      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-md font-medium"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Sidebar;