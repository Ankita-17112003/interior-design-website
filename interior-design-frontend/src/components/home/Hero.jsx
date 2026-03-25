import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

function Hero() {
  return (
    <div className="w-full h-screen">

      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        speed={1500}
        loop={true}
        className="h-full"
      >

        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-screen">

            <img
              src={img1}
              alt="Interior Design"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

              <h1 className="text-4xl md:text-6xl font-bold">
                Design is Thinking Made Visual
              </h1>

              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Modern interior designs that bring elegance and comfort.
              </p>

                <div className="flex gap-4 mt-4 pt-5">
              <button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fa8c2d] text-gray-900 font-['Poppins'] font-medium text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(232,213,196,0.3)] hover:scale-105"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

             <button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fa8c2d] text-gray-900 font-['Poppins'] font-medium text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(232,213,196,0.3)] hover:scale-105"
            >
              <span className="relative z-10">More About Us</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            </div>

            </div>

          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-screen">

            <img
              src={img2}
              alt="Interior Design"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

              <h1 className="text-4xl md:text-6xl font-bold">
                Luxury Interior Designs
              </h1>

              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Creating beautiful and functional spaces for your lifestyle.
              </p>

              <div className="flex gap-4 mt-4 pt-5">
              <button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fa8c2d] text-gray-900 font-['Poppins'] font-medium text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(232,213,196,0.3)] hover:scale-105"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

             <button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fa8c2d] text-gray-900 font-['Poppins'] font-medium text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(232,213,196,0.3)] hover:scale-105"
            >
              <span className="relative z-10">More About Us</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            </div>

            </div>

          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-screen">

            <img
              src={img3}
              alt="Interior Design"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">

              <h1 className="text-4xl md:text-6xl font-bold">
               Design Your Home With Modern Technology
              </h1>

              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Smart, elegant, and creative interior solutions.
              </p>

              <div className="flex gap-4 mt-4 pt-5">
              <button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fa8c2d] text-gray-900 font-['Poppins'] font-medium text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(232,213,196,0.3)] hover:scale-105"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

             <button
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#fa8c2d] text-gray-900 font-['Poppins'] font-medium text-xs sm:text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(232,213,196,0.3)] hover:scale-105"
            >
              <span className="relative z-10">More About Us</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            </div>

            </div>

          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  );
}

export default Hero;