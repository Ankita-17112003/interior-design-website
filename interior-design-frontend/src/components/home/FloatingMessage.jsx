import React, { useEffect, useRef } from "react";
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const FloatingMessage = () => {
  const buttonRef = useRef(null);
  const bubbleRef = useRef(null);
  const tooltipRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(bubbleRef.current, {
      y: -20,
      opacity: 1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.3,
    });

    // Tooltip: page load hote hi dikhega aur permanently rahega
    gsap.set(tooltipRef.current, { opacity: 0, y: -10 });

    const showTimer = setTimeout(() => {
      gsap.to(tooltipRef.current, { opacity: 1, y: 0, duration: 0.4 });
    }, 800);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div
        ref={tooltipRef}
        className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg font-body mb-1 opacity-0 pointer-events-none whitespace-nowrap"
      >
        Send us a message
      </div>

      <button
        ref={buttonRef}
        onClick={goToContact}
        className="relative flex items-center justify-center w-14 h-14 bg-[#f0a844] text-white rounded-full shadow-lg cursor-pointer hover:bg-[#ecb260] transition-colors duration-300"
      >
        <FaEnvelope className="text-2xl" />
        <span
          ref={bubbleRef}
          className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full opacity-0"
        ></span>
      </button>

      <a
        href="https://www.instagram.com/chandakinterior?igsh=NDZwZHgxNWtuZzJw"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 group"
      >
        <FaInstagram className="text-xl z-10" />
        <span className="absolute w-full h-full rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] opacity-30 blur-xl animate-ping"></span>
      </a>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:bg-[#1ebe5b] transition-all duration-300"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-xl" />
      </a>
    </div>
  );
};

export default FloatingMessage;
