import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Projects from "../pages/Projects/Projects";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";
import Skills from "../pages/Skills/Skills";
import Experience from "../pages/Experience/Experience";
import Blog from "../pages/Blog/Blog";
import BlogArticle from "../pages/BlogArticle/BlogArticle";
import Resume from "../pages/Resume/Resume";
import Contact from "../pages/Contact/Contact";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/networking" element={<Projects category="networking" />} />
        <Route path="/projects/embedded" element={<Projects category="embedded" />} />
        <Route path="/projects/software" element={<Projects category="software" />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/networking" element={<Skills category="networking" />} />
        <Route path="/skills/embedded" element={<Skills category="embedded" />} />
        <Route path="/skills/programming" element={<Skills category="programming" />} />
        <Route path="/skills/tools" element={<Skills category="tools" />} />

        <Route path="/experience" element={<Experience />} />
        <Route path="/experience/volunteering" element={<Experience category="volunteering" />} />
        <Route path="/experience/hackathons" element={<Experience category="hackathons" />} />
        <Route path="/experience/leadership" element={<Experience category="leadership" />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogArticle />} />

        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
