// pages/Contact.jsx
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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
      // Page entrance animation
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      // Form animation
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

      // Info animation
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

      // Map animation
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you! We\'ll get back to you soon.'
    });

    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'residential',
        message: ''
      });
    }, 3000);
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
    <div ref={pageRef} className="pt-20 min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd0b2e9b38b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Contact"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 to-stone-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto px-4">
            Have a project in mind? We'd love to hear about it. Let's discuss how we can transform your space.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800 mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm sm:text-base"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-stone-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white text-sm sm:text-base"
                  >
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none text-sm sm:text-base"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus.submitted}
                  className="w-full px-6 py-3 sm:py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {formStatus.submitted ? 'Sending...' : 'Send Message'}
                </button>

                {/* Form Status Message */}
                {formStatus.message && (
                  <div className={`p-4 rounded-lg ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-sm sm:text-base`}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div ref={infoRef} className="w-full space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800 mb-6">
                  Contact Information
                </h2>
                <p className="text-sm sm:text-base text-stone-600 mb-8">
                  Feel free to reach out through any of these channels. We're here to help you 24/7.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Visit Us</h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed break-words">
                      Lakshminarayan Bunglow Lane no. 1, Shridhar Colony, Near Cummins College, Karve Nagar, Pune - 411052
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Call Us</h3>
                    <a href="tel:+9175905644" className="text-xs sm:text-sm text-stone-600 hover:text-orange-500 transition-colors block mt-1 break-all">
                      +91 91759 05644
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-800 text-sm sm:text-base">Email Us</h3>
                    <a href="mailto:designerschandakandassociates@gmail.com" className="text-xs sm:text-sm text-stone-600 hover:text-orange-500 transition-colors block mt-1 break-all">
                      designerschandakandassociates@gmail.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
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
              <div className="pt-4 sm:pt-6">
                <h3 className="font-semibold text-stone-800 text-sm sm:text-base mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors group"
                    >
                      <span className="text-xs sm:text-sm text-stone-600 group-hover:text-white capitalize">
                        {social[0]}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div ref={mapRef} className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800 mb-6 text-center">
              Find Us Here
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 md:h-96 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2!2d73.8!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzAwLjAiTiA3M8KwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
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

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "How do I schedule a consultation?",
                a: "You can schedule a consultation by filling out the contact form above or calling us directly. We'll get back to you within 24 hours."
              },
              {
                q: "Do you offer virtual consultations?",
                a: "Yes, we offer both in-person and virtual consultations via video calls for clients who are unable to visit our office."
              },
              {
                q: "What is your design process?",
                a: "Our process includes initial consultation, concept development, design refinement, material selection, and final execution."
              },
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on scope. A typical residential project takes 4-8 weeks from concept to completion."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                <h3 className="font-semibold text-stone-800 text-sm sm:text-base mb-2">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;