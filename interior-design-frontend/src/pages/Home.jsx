import React from "react";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import StatsSection from "../components/home/StatsSection";
import ServiceSection from "../components/home/ServiceSection";
import ProjectSection from "../components/home/ProjectSection";
import ContactSection from "../components/home/ContactSection";
import OurProcess from "../components/about/OurProcess";
import Testimonials from "../components/about/Testimonials";
import ServiceAreaSection from "../components/home/ServiceAreaSection";

const Home = () => {
  return (
    <>
      <Hero/>
      <AboutSection/>
      <ServiceSection />
      <ServiceAreaSection/>
      <StatsSection />
      <OurProcess/>
      <ProjectSection />
      <Testimonials/>
      <ContactSection />
    </>
  );
};

export default Home;
