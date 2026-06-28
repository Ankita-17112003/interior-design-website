const mainServices = [
  {
    id: "residential",
    name: "Residential Design",
    description: "Transform your living spaces into beautiful, functional homes tailored to your lifestyle.",
    subservices: ["2 BHK", "3 BHK", "Studio Apartment", "Duplex", "Villa / Bungalow","3D Views"],
  },
  {
    id: "commercial-hospitality",
    name: "Commercial & Hospitality",
    description: "Inspiring commercial and hospitality environments that leave lasting impressions.",
    subservices: ["Office", "Restaurant", "Cafe", "Fitness Club", "Retail Shop", "Hospital", "Bank", "Dental Clinic","3D Views"],
  },
  {
    id: "turnkey",
    name: "Turnkey Projects",
    description: "Complete end-to-end interior solutions — from design to execution, hassle free.",
    subservices: ["2 BHK", "3 BHK", "Bungalow", "Studio Apartment", "Duplex", "Restaurant", "Office", "Hospital", "Bank", "Dental Clinic", "Shop","3D Views"],
  },
  {
    id: "consultancy",
    name: "Consultancy",
    description: "Expert design consultancy services to guide your project at every stage.",
    subservices: ["Planning","Working Drawing 2D", "Working + Site Execution ", "Labour Providing and Management","3D Views"],
  },
  {
    id: "themed-interior",
    name: "Themed Interior",
    description: "Unique themed interiors crafted to express your personality and vision.",
    subservices: ["Rustic", "Modern", "Contemporary", "Art Deco", "Minimalist", "Traditional","3D Views"],
  },
  {
    id: "renovation",
    name: "Renovation",
    description: "Breathe new life into your existing spaces with our expert renovation services.",
    subservices: [
      // Full Home Renovation ke andar
      "Living Room",
      "Kitchen",
      "Bedroom",
      "Balcony",
      "Bathroom",
      // Full Commercial Space Renovation ke andar
      "Office Renovation",
      "Hospital Renovation",
      "Bank Renovation",
      "Shop Renovation"
      
    ],
    // Nested structure for menu display
    subGroups: [
      {
        groupName: "Full Home Renovation",
        items: ["Living Room", "Kitchen", "Bedroom", "Balcony", "Bathroom","3D Views"],
      },
      {
        groupName: "Full Commercial Space Renovation",
        items: ["Office Renovation", "Hospital Renovation", "Bank Renovation", "Shop Renovation","3D Views"],
      },
    ],
  },
  {
    id: "space-management",
    name: "Space Management",
    description: "Smart space planning solutions that maximise functionality and flow.",
    subservices: ["Planning", "Furniture Layout", "Landscape Expansion"],
  },
];

export default mainServices;