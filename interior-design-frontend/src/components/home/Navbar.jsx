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

  const closeMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setActiveMainService(null);
  };
  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setIsServicesOpen(false), 150);
  };
  const toggleMainService = (id) =>
    setActiveMainService((prev) => (prev === id ? null : id));

  const handleSubserviceClick = (serviceId, sub) => {
    navigate(`/services/${serviceId}/${slugify(sub)}`);
    closeMenu();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-md h-16" : "shadow-sm h-20"
        }`}
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* LOGO */}
          <NavLink
            to="/"
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 min-w-0 flex-shrink-0 md:-ml-4 lg:-ml-6"
          >
            <img
              src="https://res.cloudinary.com/dpiwsczfb/image/upload/e_trim/v1782584190/CHANDAK_LOGO_final2_mp0u6t.png"
              alt="logo"
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain flex-shrink-0"
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-base sm:text-lg md:text-lg font-semibold text-gray-800 tracking-tight font-playfair whitespace-nowrap">
                Chandak <span className="text-orange-500">&</span> Associates
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[10px] font-normal text-gray-400 tracking-widest uppercase">
                Interior Design Studio
              </span>
            </div>
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.path}
                  ref={servicesRef}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  className="relative"
                >
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-150">
                    Services
                    <svg
                      className="w-3 h-3 opacity-50 transition-transform duration-200"
                      style={{
                        transform: isServicesOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <ServicesMegaMenu
                    isOpen={isServicesOpen}
                    onClose={() => setIsServicesOpen(false)}
                  />
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-all duration-150 after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-[2px] after:bg-orange-500 after:rounded-full after:origin-left after:transition-transform after:duration-300 after:ease-out ${
                      isActive
                        ? "text-orange-500 font-semibold after:scale-x-100"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg after:scale-x-0"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </div>

          {/* CTA */}
          <NavLink
            to="/contact"
            className="hidden md:inline-block px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-150 hover:opacity-90 hover:-translate-y-px flex-shrink-0"
            style={{ background: "#f97316" }}
          >
            Get a Quote
          </NavLink>

          {/* MOBILE BURGER */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 hover:bg-orange-50 transition-colors"
            style={{ border: "1px solid #f0f0f0" }}
          >
            {isOpen ? (
              <FaTimes size={16} className="text-orange-500" />
            ) : (
              <FaBars size={16} className="text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}

        <div className="p-5 flex flex-col gap-1 mt-16">
          {navLinks.map((link) => (
            <div key={link.path}>
              {link.label === "Services" ? (
                <>
                  <button
                    onClick={() => setMobileServicesOpen((p) => !p)}
                    className="w-full text-left text-gray-700 text-base font-medium border-b border-gray-100 py-3 flex items-center justify-between"
                  >
                    <span>Services</span>
                    <span
                      style={{
                        display: "inline-block",
                        transition: "transform 0.2s",
                        transform: mobileServicesOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        fontSize: "11px",
                        color: "#f97316",
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-1 mb-2">
                      {mainServices.map((service) => (
                        <div key={service.id}>
                          <button
                            onClick={() => toggleMainService(service.id)}
                            className="w-full text-left flex items-center justify-between px-4 py-3"
                            style={{
                              background:
                                activeMainService === service.id
                                  ? "#fff8f0"
                                  : "#f9f9f9",
                              borderLeft:
                                activeMainService === service.id
                                  ? "3px solid #f97316"
                                  : "3px solid transparent",
                              marginBottom: "2px",
                              fontSize: "14px",
                              borderRadius: "6px",
                              fontWeight:
                                activeMainService === service.id ? 600 : 400,
                              color:
                                activeMainService === service.id
                                  ? "#f97316"
                                  : "#374151",
                            }}
                          >
                            <span>
                              {service.icon} {service.name}
                            </span>
                            <span
                              style={{
                                display: "inline-block",
                                transition: "transform 0.2s",
                                transform:
                                  activeMainService === service.id
                                    ? "rotate(90deg)"
                                    : "rotate(0deg)",
                                fontSize: "12px",
                                color: "#9ca3af",
                              }}
                            >
                              ›
                            </span>
                          </button>

                          {activeMainService === service.id && (
                            <div
                              style={{
                                background: "#fafafa",
                                marginBottom: "4px",
                              }}
                            >
                              {service.subGroups
                                ? service.subGroups.map((group) => (
                                    <div key={group.groupName}>
                                      <div
                                        style={{
                                          padding: "8px 16px 4px 32px",
                                          fontSize: "11px",
                                          fontWeight: 700,
                                          color: "#f97316",
                                          textTransform: "uppercase",
                                          letterSpacing: "0.08em",
                                        }}
                                      >
                                        {group.groupName}
                                      </div>
                                      {group.items.map((sub, i) => (
                                        <button
                                          key={i}
                                          onClick={() =>
                                            handleSubserviceClick(
                                              service.id,
                                              sub,
                                            )
                                          }
                                          style={{
                                            display: "block",
                                            padding: "10px 16px 10px 40px",
                                            fontSize: "13px",
                                            color: "#555",
                                            borderBottom: "1px solid #f1f1f1",
                                            background: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            width: "100%",
                                            textAlign: "left",
                                          }}
                                        >
                                          › {sub}
                                        </button>
                                      ))}
                                    </div>
                                  ))
                                : service.subservices.map((sub, i) => (
                                    <button
                                      key={i}
                                      onClick={() =>
                                        handleSubserviceClick(service.id, sub)
                                      }
                                      style={{
                                        display: "block",
                                        padding: "10px 16px 10px 32px",
                                        fontSize: "13px",
                                        color: "#555",
                                        borderBottom:
                                          i < service.subservices.length - 1
                                            ? "1px solid #f1f1f1"
                                            : "none",
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        width: "100%",
                                        textAlign: "left",
                                      }}
                                    >
                                      › {sub}
                                    </button>
                                  ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block text-base font-medium border-b border-gray-100 py-3 transition-colors ${
                      isActive ? "text-orange-500" : "text-gray-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}

          <NavLink
            to="/contact"
            onClick={closeMenu}
            className="mt-4 text-center py-3 rounded-lg text-sm font-medium text-white block"
            style={{ background: "#f97316" }}
          >
            Get a Quote
          </NavLink>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
}

export default Navbar;
