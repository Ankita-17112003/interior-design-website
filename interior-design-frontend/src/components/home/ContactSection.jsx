import React from "react";
import contactImg from "../../assets/img2.jpg"; // Optional: use a nice image

const ContactSection = () => {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Image */}
          <div className="hidden md:block">
            <img
              src={contactImg}
              alt="Contact Us"
              className="rounded-xl shadow-lg object-cover w-full h-[400px]"
            />
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-title">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8 font-body">
              Have a project in mind or just want to say hi? Send us a message and we’ll get back to you promptly.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a97e]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-semibold">Message</label>
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a97e] h-32 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="
                  mt-4 px-8 py-3 rounded-lg text-white font-semibold
                  bg-gradient-to-r from-[#f0a844] to-[#a78b64]
                  shadow-lg transform transition duration-300
                  hover:scale-105 hover:from-[#ecb260] hover:to-[#c4a06e]
                  focus:outline-none
                  block md:inline-block
                  mx-auto md:mx-0
                "
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;