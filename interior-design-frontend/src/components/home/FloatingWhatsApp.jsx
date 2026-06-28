import React, { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";

const FloatingWhatsApp = () => {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // Looping pulse animation for button
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Tooltip initial state
    gsap.set(tooltipRef.current, { opacity: 0, y: -10 });
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg font-body mb-1 opacity-0 pointer-events-none"
      >
        Chat with us
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        ref={buttonRef}
        onMouseEnter={() =>
          gsap.to(tooltipRef.current, { opacity: 1, y: 0, duration: 0.3 })
        }
        onMouseLeave={() =>
          gsap.to(tooltipRef.current, { opacity: 0, y: -10, duration: 0.3 })
        }
        className="
          relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg cursor-pointer
          hover:bg-[#1ebe5b] transition-colors duration-300
        "
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;