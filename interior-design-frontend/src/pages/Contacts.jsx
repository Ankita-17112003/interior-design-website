// pages/Contact.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import gsap from 'gsap';
import axios from "axios";
import Swal from "sweetalert2";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaYoutube, FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

import img2 from "../assets/img6.jpg";

import api from "../api/axios";

gsap.registerPlugin(ScrollTrigger);

const Contacts = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'residential',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const pageRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(formRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(infoRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(mapRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!formData.email.trim()) {
  Swal.fire({
    icon: "error",
    title: "Email Required",
    text: "Please enter your email address",
  });
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  Swal.fire({
    icon: "error",
    title: "Invalid Email",
    text: "Example: ankita@gmail.com",
  });
  return;
}

    try {
      setFormStatus({
        submitted: true,
        success: false,
        message: "",
      });

     const res = await api.post("/contacts", formData);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "We will contact you soon.",
          confirmButtonColor: "#f97316",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "residential",
          message: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Unable to send message.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setFormStatus({
        submitted: false,
        success: false,
        message: "",
      });
    }
  };

  const services = [
    { id: 'residential', name: 'Residential Interior Design' },
    { id: 'commercial', name: 'Commercial & Hospitality' },
    { id: 'turnkey', name: 'Turnkey Projects' },
    { id: 'consultancy', name: 'Design Consultancy' },
    { id: 'themed', name: 'Themed Interiors' },
    { id: 'renovation', name: 'Renovation' },
    { id: 'space', name: 'Space Management' }
  ];

  return (
    <div ref={pageRef} className="pt-16 sm:pt-20 min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section - Improved */}
     {/* Hero Section - Improved */}
<section className="relative bg-stone-900 text-white py-20 sm:py-24 md:py-32 overflow-hidden">
  <div className="absolute inset-0">
    <img
      src={img2}
      alt="Contact"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/50" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="inline-block bg-orange-500/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4">
      <span className="text-orange-400 text-sm font-semibold">Get in Touch</span>
    </div>
    <h1 className="text-4xl sm:text-5xl font-['Playfair_Display'] md:text-6xl lg:text-7xl font-bold mb-4">
      Let's Create <span className="text-orange-500">Something</span> <br /> Beautiful
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-3xl mx-auto px-4">
      Have a project in mind? We'd love to hear about it. Let's discuss how we can transform your space into something extraordinary.
    </p>
  </div>
</section>

      {/* Main Contact Section */}
      <section className="py-12 sm:py-16 md:py-24" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form - Improved */}
            <div ref={formRef} className="w-full" id="contact-form">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2 font-playfair">
                  Send Us a Message
                </h2>
                <p className="text-stone-500 mb-6 sm:mb-8 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Name Field */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
                      Your Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base bg-gray-50 focus:bg-white"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
                      Email Address <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base bg-gray-50 focus:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="group">
                    <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base bg-gray-50 focus:bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Service Selection */}
                  <div className="group">
                    <label htmlFor="service" className="block text-sm font-semibold text-stone-700 mb-2">
                      Service Interested In <span className="text-orange-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-gray-50 focus:bg-white text-sm sm:text-base"
                    >
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-2">
                      Your Message <span className="text-orange-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none text-sm sm:text-base bg-gray-50 focus:bg-white"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus.submitted}
                    className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-lg hover:shadow-xl"
                  >
                    {formStatus.submitted ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information - Improved */}
           <div ref={infoRef} className="w-full">
  <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-orange-100">
    <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2 font-playfair">
      Contact Information
    </h2>
    <p className="text-stone-500 mb-6 sm:mb-8 text-sm sm:text-base">
      Feel free to reach out through any of these channels. We're here to help you.
    </p>

    {/* Contact Details */}
    <div className="space-y-5 sm:space-y-6">

      {/* Address */}
      <div className="flex items-start gap-3 sm:gap-4 group">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Visit Us</h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
            Lakshminarayan Bunglow Lane no. 1, Shridhar Colony, Near Cummins College, Karve Nagar, Pune - 411052
          </p>
        </div>
      </div>

      {/* Telephone — NEW */}
      <div className="flex items-start gap-3 sm:gap-4 group">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <FaPhoneAlt className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Telephone</h3>
          <a
            href="tel:+912012345678"
            className="text-xs sm:text-sm text-stone-600 hover:text-orange-500 transition-colors block mt-1"
          >
            +91 (020) 1234-5678
          </a>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-start gap-3 sm:gap-4 group">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <FaPhoneAlt className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Call Us</h3>
          <a
            href="tel:+9175905644"
            className="text-xs sm:text-sm text-stone-600 hover:text-orange-500 transition-colors block mt-1"
          >
            +91 91759 05644
          </a>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 sm:gap-4 group">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Email Us</h3>
          <a
            href="mailto:designerschandakandassociates@gmail.com"
            className="text-xs sm:text-sm text-stone-600 hover:text-orange-500 transition-colors block mt-1 break-all"
          >
            designerschandakandassociates@gmail.com
          </a>
        </div>
      </div>

      {/* Business Hours */}
      <div className="flex items-start gap-3 sm:gap-4 group">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
          <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Business Hours</h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Monday - Saturday: 9:00 AM - 7:00 PM<br />
            Sunday: Closed
          </p>
        </div>
      </div>

    </div>

    {/* Social Media Links */}
    <div className="pt-8 mt-4 border-t border-orange-200">
      <h3 className="font-semibold text-stone-800 text-base sm:text-lg mb-5">
        Follow Us
      </h3>

      <div className="grid grid-cols-5 gap-2 sm:flex sm:flex-wrap sm:gap-3">

        {/* Facebook */}
        <a href="https://www.facebook.com/share/1DSVz2JGeY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-all duration-300"></div>
            <FaFacebookF className="relative z-10 text-stone-600 group-hover:text-white text-lg transition-colors duration-300" />
          </div>
          <span className="text-[10px] text-stone-500 group-hover:text-blue-600 transition-colors duration-300 hidden sm:block">Facebook</span>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/chandakinterior?igsh=NDZwZHgxNWtuZzJw" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-400 translate-y-full group-hover:translate-y-0 transition-all duration-300"></div>
            <FaInstagram className="relative z-10 text-stone-600 group-hover:text-white text-lg transition-colors duration-300" />
          </div>
          <span className="text-[10px] text-stone-500 group-hover:text-pink-500 transition-colors duration-300 hidden sm:block">Instagram</span>
        </a>

        {/* WhatsApp */}
        <a href="https://wa.me/9175905644" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-all duration-300"></div>
            <FaWhatsapp className="relative z-10 text-stone-600 group-hover:text-white text-lg transition-colors duration-300" />
          </div>
          <span className="text-[10px] text-stone-500 group-hover:text-green-500 transition-colors duration-300 hidden sm:block">WhatsApp</span>
        </a>

        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/shailesh-chandak-15a7a9a3" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-all duration-300"></div>
            <FaLinkedinIn className="relative z-10 text-stone-600 group-hover:text-white text-lg transition-colors duration-300" />
          </div>
          <span className="text-[10px] text-stone-500 group-hover:text-blue-700 transition-colors duration-300 hidden sm:block">LinkedIn</span>
        </a>

        {/* YouTube */}
        <a href="https://www.youtube.com/@ChandakInterior" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-1.5">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-all duration-300"></div>
            <FaYoutube className="relative z-10 text-stone-600 group-hover:text-white text-lg transition-colors duration-300" />
          </div>
          <span className="text-[10px] text-stone-500 group-hover:text-red-600 transition-colors duration-300 hidden sm:block">YouTube</span>
        </a>

      </div>
    </div>

  </div>
</div>
          </div>

          {/* Map Section - Improved */}
          <div ref={mapRef} className="mt-12 sm:mt-16">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-3 font-playfair">
                Find Us Here
              </h2>
              <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
              <p className="text-stone-500 mt-3 text-sm sm:text-base">
                Visit our studio for a personal consultation
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white h-64 sm:h-80 md:h-96 w-full">
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
      </section>

      {/* FAQ Section - Improved */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-stone-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-3 font-playfair">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
            <p className="text-stone-500 mt-3 text-sm sm:text-base">
              Everything you need to know about working with us
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "How do I schedule a consultation?",
                a: "You can schedule a consultation by filling out the contact form above or calling us directly. We'll get back to you within 24 hours to schedule a convenient time."
              },
              {
                q: "Do you offer virtual consultations?",
                a: "Yes, we offer both in-person and virtual consultations via video calls for clients who are unable to visit our office."
              },
              {
                q: "What is your design process?",
                a: "Our process includes initial consultation, concept development, design refinement, material selection, and final execution with regular updates throughout."
              },
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on scope. A typical residential project takes 4-8 weeks from concept to completion."
              }
            ].map((faq, index) => (
              <div key={index} className="group bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                <h3 className="font-semibold text-stone-800 text-sm sm:text-base mb-2 flex items-start gap-2">
                  <span className="text-orange-500 text-lg">✦</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;