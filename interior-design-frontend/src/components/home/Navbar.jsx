import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ServicesMegaMenu from "../services/ServicesMegaMenu";
import mainServices from "../../data/servicesData";

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeMainService, setActiveMainService] = useState(null);

  const servicesRef = useRef(null);
  const closeTimer = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setActiveMainService(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target))
        setIsServicesOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeMenu = () => { setIsOpen(false); setMobileServicesOpen(false); setActiveMainService(null); };
  const handleEnter = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setIsServicesOpen(true); };
  const handleLeave = () => { closeTimer.current = setTimeout(() => setIsServicesOpen(false), 150); };
  const toggleMainService = (id) => setActiveMainService((prev) => (prev === id ? null : id));

  const handleSubserviceClick = (serviceId, sub) => {
    navigate(`/services/${serviceId}/${slugify(sub)}`);
    closeMenu();
  };

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition ${isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"}`;

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-md py-4"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center rounded font-bold">ID</div>
            <span className="font-bold text-gray-800">Chandak Associates</span>
          </NavLink>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div key={link.path} ref={servicesRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave} className="relative">
                  <span className="relative text-sm font-medium text-gray-700 hover:text-orange-500 cursor-default select-none">Services</span>
                  <ServicesMegaMenu isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
                </div>
              ) : (
                <NavLink key={link.path} to={link.path} className={linkClass}>{link.label}</NavLink>
              )
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button onClick={() => setIsOpen((p) => !p)} className="md:hidden text-gray-700">
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 transition-transform duration-300 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex flex-col gap-2 mt-16">
          {navLinks.map((link) => (
            <div key={link.path}>
              {link.label === "Services" ? (
                <>
                  <button
                    onClick={() => setMobileServicesOpen((p) => !p)}
                    className="w-full text-left text-gray-700 text-lg font-medium border-b pb-3 flex items-center justify-between"
                  >
                    <span>Services</span>
                    <span style={{ display: "inline-block", transition: "transform 0.2s", transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)", fontSize: "12px" }}>▾</span>
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-1 mb-2">
                     

                      {mainServices.map((service) => (
                        <div key={service.id}>
                          <button
                            onClick={() => toggleMainService(service.id)}
                            className="w-full text-left flex items-center justify-between px-4 py-3"
                            style={{
                              background: activeMainService === service.id ? "#fff8f0" : "#f9f9f9",
                              borderLeft: activeMainService === service.id ? "3px solid #f97316" : "3px solid transparent",
                              marginBottom: "2px", fontSize: "14px",
                              fontWeight: activeMainService === service.id ? 600 : 400,
                              color: activeMainService === service.id ? "#f97316" : "#374151",
                            }}
                          >
                            <span>{service.icon} {service.name}</span>
                            <span style={{ display: "inline-block", transition: "transform 0.2s", transform: activeMainService === service.id ? "rotate(90deg)" : "rotate(0deg)", fontSize: "12px", color: "#9ca3af" }}>›</span>
                          </button>

                          {activeMainService === service.id && (
                            <div style={{ background: "#fafafa", marginBottom: "4px" }}>
                              {service.subGroups ? (
                                // Grouped subservices (renovation)
                                service.subGroups.map((group) => (
                                  <div key={group.groupName}>
                                    <div style={{ padding: "8px 16px 4px 32px", fontSize: "11px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                      {group.groupName}
                                    </div>
                                    {group.items.map((sub, i) => (
                                      <button
                                        key={i}
                                        onClick={() => handleSubserviceClick(service.id, sub)}
                                        style={{
                                          display: "block", padding: "10px 16px 10px 40px",
                                          fontSize: "13px", color: "#555",
                                          borderBottom: "1px solid #f1f1f1",
                                          background: "transparent", border: "none",
                                          cursor: "pointer", width: "100%", textAlign: "left",
                                        }}
                                      >
                                        › {sub}
                                      </button>
                                    ))}
                                  </div>
                                ))
                              ) : (
                                // Normal subservices
                                service.subservices.map((sub, i) => (
                                  <button
                                    key={i}
                                    onClick={() => handleSubserviceClick(service.id, sub)}
                                    style={{
                                      display: "block", padding: "10px 16px 10px 32px",
                                      fontSize: "13px", color: "#555",
                                      borderBottom: i < service.subservices.length - 1 ? "1px solid #f1f1f1" : "none",
                                      background: "transparent", border: "none",
                                      cursor: "pointer", width: "100%", textAlign: "left",
                                    }}
                                  >
                                    › {sub}
                                  </button>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink to={link.path} onClick={closeMenu} className="block text-gray-700 text-lg font-medium border-b pb-3">
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={closeMenu} />}
    </>
  );
}

export default Navbar;