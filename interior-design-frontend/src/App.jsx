import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import ScrollToTop from "./components/home/ScrollToTop";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import FloatingMessage from "./components/home/FloatingMessage";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import ProjectsGallery from "./components/projects/ProjectsGallery";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProjects from "./pages/Admin/AdminProjects";
import AdminServices from "./pages/Admin/AdminServices";
import AdminTestimonials from "./pages/Admin/AdminTestimonials";
import AdminContacts from "./pages/Admin/AdminContacts";
import AddProject from "./pages/Admin/AddProject";
import EditProject from "./pages/Admin/EditProject";

// Admin layout
import AdminLayout from "./components/admin/AdminLayout";

function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contacts />} />
        <Route
          path="/services/:service/:subservice"
          element={<ProjectsGallery />}
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminProjects />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/add" element={<AddProject />} />
          <Route path="/admin/projects/edit/:id" element={<EditProject />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>

        <Route path="*" element={<><Navbar /><NotFound/></>} />
      </Routes>

      {!isAdminPage && <Footer />}

      {/* 👇 Floating buttons — public pages only */}
      {!isAdminPage && <FloatingMessage />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;