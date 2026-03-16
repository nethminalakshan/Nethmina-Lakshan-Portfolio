import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";

function navItemClass({ isActive }) {
  return isActive ? "navItem navItemActive" : "navItem";
}

export default function Navbar() {
  return (
    <header className="siteHeader" role="banner">
      <div className="container navBar">
        <NavLink className="brand" to="/" aria-label="Go to home">
          <span className="brandMark" aria-hidden="true">
            N
          </span>
          <span className="brandName">Nethmina</span>
        </NavLink>

        <nav className="navLinks" aria-label="Primary">
          <NavLink to="/" className={navItemClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={navItemClass}>
            About
          </NavLink>
          <NavLink to="/projects" className={navItemClass}>
            Projects
          </NavLink>
          <NavLink to="/skills" className={navItemClass}>
            Skills
          </NavLink>
          <NavLink to="/experience" className={navItemClass}>
            Experience
          </NavLink>
          <NavLink to="/blog" className={navItemClass}>
            Blog
          </NavLink>
          <NavLink to="/resume" className={navItemClass}>
            Resume
          </NavLink>
          <NavLink to="/contact" className={navItemClass}>
            Contact
          </NavLink>
        </nav>

        <Button to="/contact">Contact</Button>
      </div>
    </header>
  );
}
