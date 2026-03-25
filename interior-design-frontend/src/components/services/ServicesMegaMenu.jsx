// components/ServicesMegaMenu.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ServicesMegaMenu = ({ isOpen, onClose }) => {
  const [activeService, setActiveService] = useState("residential");

  // Main services data
  const mainServices = [
    { id: "residential", name: "Residential Design", icon: "🏠" },
    { id: "commercial", name: "Commercial & Hospitality", icon: "🏢" },
    { id: "turnkey", name: "Turnkey", icon: "🔑" },
    { id: "consultancy", name: "Consultancy", icon: "💡" },
    { id: "themed", name: "Themed Interior", icon: "🎭" },
    { id: "renovation", name: "Renovation", icon: "🔄" },
    { id: "space", name: "Space Management", icon: "📐" },
    { id: "customize", name: "Customize Furniture", icon: "🪑" },
    { id: "affordable", name: "Affordable And Budget Friendly Interior Designers In Pune", icon: "💰" }
  ];

  // Subservices data
  const subservicesData = {
    residential: ["2 BHK", "3 BHK", "Studio Apartment", "Duplex", "Villa / Bungalow"],
    commercial: ["Office Interior", "Restaurant Design", "Hotel Design", "Retail Store", "Co-working Space"],
    turnkey: ["Complete Interior", "Project Management", "Execution Services", "Handover Solutions"],
    consultancy: ["Design Consultation", "Material Selection", "Space Planning", "Budget Planning"],
    themed: ["Modern Contemporary", "Minimalist", "Industrial", "Bohemian", "Scandinavian"],
    renovation: ["Home Renovation", "Kitchen Remodel", "Bathroom Renovation", "Office Renovation"],
    space: ["Space Optimization", "Storage Solutions", "Floor Planning", "Modular Furniture"],
    customize: ["Custom Sofas", "Modular Kitchen", "Wardrobes", "TV Units", "Dining Tables"],
    affordable: ["Budget Homes", "Affordable Apartments", "Small Space Design", "Economical Solutions"]
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 mt-2 w-[800px] z-50"
      onMouseLeave={onClose}
    >
      <div className="bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600" />
        
        <div className="flex">
          {/* Left Column - Main Services */}
          <div className="w-[280px] bg-gray-50 p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Main Services
            </h3>
            <div className="space-y-1">
              {mainServices.map((service) => (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveService(service.id)}
                  className={`
                    px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                    flex items-center gap-3
                    ${activeService === service.id
                      ? 'bg-orange-500 text-white'
                      : 'hover:bg-orange-100 text-gray-700'
                    }
                  `}
                >
                  <span className="text-lg">{service.icon}</span>
                  <span className="text-sm font-medium flex-1">
                    {service.name}
                  </span>
                  {activeService === service.id && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Subservices */}
          <div className="flex-1 p-6">
            {/* Show subservices for active service */}
            {activeService && subservicesData[activeService] && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {mainServices.find(s => s.id === activeService)?.name}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {subservicesData[activeService].length} services
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {subservicesData[activeService].map((subservice, index) => (
                    <Link
                      key={index}
                      to={`/services/${activeService}/${subservice.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-orange-50 transition-all duration-200"
                      onClick={onClose}
                    >
                      <span className="text-sm text-gray-600 group-hover:text-orange-600">
                        {subservice}
                      </span>
                      <svg 
                        className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;