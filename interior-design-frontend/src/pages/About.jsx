import React from "react";
import AboutHero from "../components/about/AboutHero";
import AboutTwoColumn from "../components/about/AboutTwoColumn";
import AboutStory from "../components/about/AboutStory";
import Mission from "../components/about/Mission";
import Testimonials from "../components/about/Testimonials";
import Team from "../components/about/Team";
import CTA from "../components/about/CTA";

const About = () => {
  return (
    <>
      <AboutHero />
      <AboutStory/>
      <Mission/>
      <Team/>
      {/* <Testimonials/> */}
      <CTA/>
      
    </>
  );
};

export default About;
