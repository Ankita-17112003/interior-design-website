import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/home/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Footer from "./components/home/Footer";
import FloatingWhatsApp from "./components/home/FloatingWhatsApp";
import FloatingMessage from "./components/home/FloatingMessage";
import Project from "./pages/Project";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <FloatingMessage />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
