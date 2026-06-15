import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

const slides = [
  {
    img: img1,
    heading: "Design is Thinking\nMade Visual",
    sub: "Modern interior designs that bring elegance and comfort to every corner of your home.",
  },
  {
    img: img2,
    heading: "Luxury Interior\nDesigns",
    sub: "Creating beautiful and functional spaces crafted for your unique lifestyle.",
  },
  {
    img: img3,
    heading: "Design Your Home\nWith Modern Technology",
    sub: "Smart, elegant, and creative interior solutions for the future of living.",
  },
];

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    setAnimKey((k) => k + 1);
  };

  // Handle button clicks with navigation
  const handleNavigation = (path, slideIndex) => {
    console.log(`Navigating to ${path} from slide ${slideIndex}`);
    // Use window.location or react-router navigate
    window.location.href = path;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        /* CRITICAL FIX - Ensure all slides are clickable */
        .hero-swiper {
          position: relative;
          z-index: 1;
        }
        
        .hero-swiper .swiper-slide {
          position: relative;
          z-index: 1;
          pointer-events: auto !important; /* Force all slides to be clickable */
        }
        
        /* Ensure content is above everything */
        .hero-swiper .swiper-slide > div {
          position: relative;
          z-index: 10;
        }
        
        /* Make sure buttons are clickable */
        .btn-primary, .btn-outline {
          position: relative;
          z-index: 100;
          pointer-events: auto !important;
        }

        .hero-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 7vw, 88px);
          font-weight: 600;
          line-height: 1.05;
          
          color: #fff;
          white-space: pre-line;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.3s;
          text-shadow: 0 2px 40px rgba(0,0,0,0.3);
        }

        .hero-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 300;
          color: rgba(255,255,255,0.75);
          max-width: 480px;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.5s;
        }

        .hero-btns {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.7s;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 16px 36px;
          background: #f97316;
          color: #fff;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
          text-decoration: none;
          display: inline-block;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          z-index: 100;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
          z-index: -1;
        }

        .btn-primary:hover::before { transform: scaleX(1); }
        .btn-primary:hover { color: #f97316; }
        .btn-primary span { position: relative; z-index: 1; }

        .btn-outline {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 15px 36px;
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.5);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
          text-decoration: none;
          display: inline-block;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
          z-index: 100;
        }

        .btn-outline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.1);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
          z-index: -1;
        }

        .btn-outline:hover::before { transform: scaleX(1); }
        .btn-outline:hover { border-color: #fff; }
        .btn-outline span { position: relative; z-index: 1; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .slide-counter {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.5);
        }

        .slide-counter strong {
          font-size: 20px;
          font-weight: 300;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
        }

        .hero-swiper .swiper-pagination {
          bottom: 32px !important;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          z-index: 20 !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 24px !important;
          height: 2px !important;
          border-radius: 0 !important;
          background: rgba(255,255,255,0.4) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 48px !important;
          background: #f97316 !important;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 48px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 20;
        }

        .scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5));
          animation: scrollLine 1.5s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
        }

        .scroll-text {
          font-family: 'Outfit', sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          writing-mode: vertical-rl;
        }

        /* ONLY ADD TOP SPACE ON MOBILE - NOTHING ELSE CHANGED */
        @media (max-width: 768px) {
          .hero-heading {
            margin-top: 60px !important;
          }
        }
      `}</style>

      <div className="w-full h-screen" style={{ position: "relative" }}>
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          speed={1800}
          loop={true}
          onSlideChange={handleSlideChange}
          className="h-full hero-swiper"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

                {/* Image with Ken Burns */}
                <div style={{
                  position: "absolute", inset: 0,
                  transform: activeIndex === i ? "scale(1.06)" : "scale(1)",
                  transition: "transform 6s ease",
                }}>
                  <img src={slide.img} alt="Interior" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Gradient overlay - make sure it doesn't block clicks */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)",
                  pointerEvents: "none", // Important: keeps overlay from blocking clicks
                }} />

                {/* Decorative vertical line */}
                <div style={{
                  position: "absolute", left: "12%", top: "15%", bottom: "15%",
                  width: "1px", background: "linear-gradient(to bottom, transparent, rgba(249,115,22,0.4), transparent)",
                  display: window.innerWidth < 768 ? "none" : "block",
                  pointerEvents: "none", // So it doesn't block clicks
                }} />

                {/* Content */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 clamp(24px, 8vw, 120px)",
                  maxWidth: "900px",
                  zIndex: 30,
                  pointerEvents: "auto", // Ensure content accepts clicks
                }}>
                  {/* Heading - added margin-top on mobile */}
                  <h1 
                    key={`h-${animKey}`} 
                    className="hero-heading" 
                    style={{ 
                      marginBottom: "24px",
                      marginTop: window.innerWidth < 768 ? "60px" : "0"
                    }}
                  >
                    {slide.heading}
                  </h1>

                  {/* Subtext */}
                  <p key={`p-${animKey}`} className="hero-sub" style={{ marginBottom: "40px" }}>
                    {slide.sub}
                  </p>

                  {/* Buttons */}
                  <div className="hero-btns">
                    <Link 
                      to="/contact" 
                      className="btn-primary"
                      onClick={(e) => {
                        console.log(`Contact button clicked on slide ${i}`);
                      }}
                    >
                      <span>Contact Us</span>
                    </Link>
                    <Link 
                      to="/about" 
                      className="btn-outline"
                      onClick={(e) => {
                        console.log(`About button clicked on slide ${i}`);
                      }}
                    >
                      <span>More About Us</span>
                    </Link>
                  </div>
                </div>

                {/* Slide counter — bottom right */}
                <div style={{
                  position: "absolute", bottom: "36px", right: "48px",
                  display: window.innerWidth < 768 ? "none" : "flex",
                  alignItems: "baseline", gap: "6px", 
                  zIndex: 30,
                  pointerEvents: "none",
                }}>
                  <span className="slide-counter"><strong>0{i + 1}</strong> / 0{slides.length}</span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scroll indicator */}
        <div className="scroll-indicator" style={{ display: window.innerWidth < 768 ? "none" : "flex" }}>
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
        </div>
      </div>
    </>
  );
}

export default Hero;