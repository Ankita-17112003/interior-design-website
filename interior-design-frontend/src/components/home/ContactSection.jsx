import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="py-10 sm:py-16 md:py-10 px-4 bg-[#fffaf7]">

      <div className="max-w-6xl mx-auto">

        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[40px]
          bg-gradient-to-r from-orange-50 to-white border border-orange-100 shadow-lg
          p-5 sm:p-10 md:p-16">

          {/* DECOR */}
          <div className="absolute top-0 right-0 w-32 sm:w-52 h-32 sm:h-52 bg-orange-200 rounded-full blur-3xl opacity-30"></div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center">

            {/* LEFT */}
            <div>

              <p className="text-orange-500 uppercase text-xs sm:text-sm tracking-widest mb-2">
                Interior Studio
              </p>

              <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 leading-tight">
                Create a Space
                <span className="text-orange-500 block">You’ll Love</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-lg mt-4 sm:mt-6">
                Elegant interiors crafted with comfort and modern design.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-10">

                <Link to="/contact">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2">
                    Start Journey <FaArrowRight />
                  </button>
                </Link>

                <Link to="/projects">
                  <button className="border border-orange-200 hover:bg-orange-50 px-6 py-3 rounded-full">
                    View Projects
                  </button>
                </Link>

              </div>

            </div>

            {/* RIGHT */}
            <div className="grid gap-3 sm:gap-5">

              {[
                { title: "Modern Interiors", desc: "Stylish spaces designed beautifully." },
                { title: "Smart Planning", desc: "Luxury layouts with optimization." },
                { title: "Creative Ideas", desc: "Unique designs for lifestyle." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactSection;