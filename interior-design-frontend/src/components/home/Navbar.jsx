import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const location = useLocation();
  const servicesDropdownRef = useRef(null);

  // Services list for dropdown
  const servicesList = [
    "Residential Design",
    "Commercial & Hospitality",
    "Turnkey Projects",
    "Design Consultancy",
    "Themed Interior",
    "Renovation Services",
    "Space Management",
    "Customize Furniture",
    "Affordable Interior Designers"
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP animations for mobile menu
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const toggleMenu = () => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(true);
    }
  };

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => setIsOpen(false),
    });
  };

  const activeStyle = ({ isActive }) => {
    return isActive
      ? "text-orange-500 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500 after:content-['']"
      : "text-gray-700 hover:text-orange-500 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:content-[''] hover:after:w-full after:transition-all after:duration-300";
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-2" 
            : "bg-white/80 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
                <span className="text-white font-bold text-lg">ID</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                  Chandak And Associates
                </span>

                <span className="text-[12px] text-gray-500 tracking-wider hidden sm:block text-center text-bold">
                  Interior Design Studio
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  {link.label === "Services" ? (
                    <div
                      ref={servicesDropdownRef}
                      className="relative"
                      onMouseEnter={() => setIsServicesDropdownOpen(true)}
                      onMouseLeave={() => setIsServicesDropdownOpen(false)}
                    >
                      <NavLink
                        to={link.path}
                        className={activeStyle}
                      >
                        {link.label}
                      </NavLink>

                      {/* Services Dropdown */}
                      {isServicesDropdownOpen && (
                        <div 
                          className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg py-2 z-50 transition-all duration-300 ease-in-out opacity-100 translate-y-0 border border-gray-100"
                          onMouseEnter={() => setIsServicesDropdownOpen(true)}
                          onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        >
                          <div className="max-h-96 overflow-y-auto custom-scrollbar">
                            {servicesList.map((service, index) => (
                              <NavLink
                                key={index}
                                to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                                className={({ isActive }) =>
                                  `block px-6 py-3 text-sm transition-all duration-200 ${
                                    isActive
                                      ? "bg-orange-50 text-orange-500 font-medium"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                                  }`
                                }
                                onClick={() => setIsServicesDropdownOpen(false)}
                              >
                                {service}
                              </NavLink>
                            ))}
                          </div>
                          
                          {/* View All Services Link */}
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <NavLink
                              to="/services"
                              className="block px-6 py-3 text-sm text-orange-500 hover:bg-orange-50 transition-all duration-200 font-medium"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              View All Services →
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={activeStyle}
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors relative z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <FaBars className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden absolute left-0 right-0 top-full mt-2 bg-white shadow-xl border-t border-gray-100 ${
            isOpen ? "block" : "hidden"
          }`}
          style={{ opacity: 0 }}
        >
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.label === "Services" ? (
                    <>
                      <NavLink
                        to={link.path}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `block py-3 px-4 rounded-lg transition-all duration-300 text-base font-medium ${
                            isActive
                              ? "bg-orange-50 text-orange-500"
                              : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                      
                      {/* Mobile Services Submenu */}
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-orange-200 pl-3">
                        {servicesList.slice(0, 5).map((service, index) => (
                          <NavLink
                            key={index}
                            to={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={closeMenu}
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            {service}
                          </NavLink>
                        ))}
                        <NavLink
                          to="/services"
                          onClick={closeMenu}
                          className="block py-2 px-4 text-sm text-orange-500 font-medium hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          View All Services →
                        </NavLink>
                      </div>
                    </>
                  ) : (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block py-3 px-4 rounded-lg transition-all duration-300 text-base ${
                          isActive
                            ? "bg-orange-50 text-orange-500 font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fdba74;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f97316;
        }
      `}</style>
    </>
  );
}

export default Navbar;