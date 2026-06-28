import React from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Top Section */}
        <div className="text-center mb-10 pb-6 border-b border-gray-800">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 font-playfair">
            Chandak & <span className="text-orange-500">Associates</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Transforming spaces into elegant and functional designs with
            creativity and style for over 15 years.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1 - Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-orange-500 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full" />
              Quick Links
            </h2>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "#", label: "Services" },
                { to: "/projects", label: "Projects" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-orange-500 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full" />
              Our Services
            </h2>
            <ul className="space-y-3">
              {[
                "Residential Design",
                "Commercial Design",
                "Turnkey Projects",
                "Consultancy",
                "Themed Interior",
                "Space Management",
                "Renovation",
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-orange-500 flex items-center gap-2">
              <span className="w-1 h-5 bg-orange-500 rounded-full" />
              Contact Info
            </h2>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3 text-gray-400 group">
                <FaMapMarkerAlt className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs sm:text-sm leading-relaxed">
                  Laxminarayan Bunglow Lane, No.1, Cummins College Rd, Sridhar Colony, Karvenagar, Pune, Maharashtra 411052
                </p>
              </div>

              {/* Telephone — NEW */}
              <div className="flex items-center gap-3 text-gray-400 group">
                <FaPhone className="w-5 h-5 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Telephone</p>
                  <a
                    href="tel:+912025456789"
                    className="hover:text-orange-500 transition-colors"
                  >
                    +91 (020) 2545-6789
                  </a>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-3 text-gray-400 group">
                <FaPhone className="w-5 h-5 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-0.5">Mobile</p>
                  <a
                    href="tel:+9175905644"
                    className="hover:text-orange-500 transition-colors"
                  >
                    +91 91759 05644
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-gray-400 group">
                <FaEnvelope className="w-5 h-5 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:designerschandakandassociates@gmail.com"
                  className="text-xs sm:text-sm hover:text-orange-500 transition-colors break-all"
                >
                  designerschandakandassociates@gmail.com
                </a>
              </div>

              {/* Business Hours */}
              <div className="flex gap-3 text-gray-400">
                <FaClock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-500">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4 - Map & Social */}
          <div>
            <div className="flex items-center justify-around mb-4">
              <h2 className="text-lg font-semibold text-orange-500 flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Find Us
              </h2>
              <h2 className="text-lg font-semibold text-orange-500 flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Follow Us
              </h2>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pb-3">
              <a href="https://wa.me/9175905644" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@ChandakInterior" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/chandakinterior?igsh=NDZwZHgxNWtuZzJw" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/shailesh-chandak-15a7a9a3" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/share/1DSVz2JGeY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-lg h-40 w-full mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.931810887603!2d73.81673007438282!3d18.486747670208132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfe727b000c1%3A0x10abc4ad674abbde!2sChandak%20%26%20Associates!5e0!3m2!1sen!2sin!4v1781351186348!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 ">
            <p className="text-xs sm:text-sm text-gray-500 ">
              &copy; {new Date().getFullYear()} Chandak & Associates. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-600">
              <Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
              <span>|</span>
              <Link to="/sitemap" className="hover:text-orange-500 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;