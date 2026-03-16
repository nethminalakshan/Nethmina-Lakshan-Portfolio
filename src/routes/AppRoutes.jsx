import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Process from "../pages/Process/Process";
import Portfolio from "../pages/Portfolio/Portfolio";
import Cta from "../pages/Cta/Cta";
import Blog from "../pages/Blog/Blog";
import Services from "../pages/Services/Services";
import Clients from "../pages/Clients/Clients";
import Testimonial from "../pages/Testimonial/Testimonial";
import Contact from "../pages/Contact/Contact";

export default function AppRoutes() {
  return (
    <>
      <Home />
      <About />
      <Process />
      <Portfolio />
      <Cta />
      <Blog />
      <Services />
      <Clients />
      <Testimonial />
      <Contact />
    </>
  );
}
