import React, { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FloatingWhatsApp = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animate the button entrance
    gsap.from(buttonRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top bottom", // trigger when bottom of viewport
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <a
      href="https://wa.me/919876543210" // replace with your number
      target="_blank"
      rel="noopener noreferrer"
      ref={buttonRef}
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        bg-[#25D366] text-white
        rounded-full shadow-lg
        px-4 py-3
        cursor-pointer
        hover:scale-110
        transition-transform duration-300
        animate-pulse
      "
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />

      {/* Text label only visible on medium+ screens */}
      <span className="hidden md:inline font-semibold select-none">
        Chat with us
      </span>
    </a>
  );
};

export default FloatingWhatsApp;