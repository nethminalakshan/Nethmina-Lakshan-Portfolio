import Button from "../Button/Button";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="siteHeader" role="banner">
      <div className="container navBar">
        <a className="brand" href="#top" aria-label="Go to top">
          <span className="brandMark" aria-hidden="true">
            N
          </span>
          <span className="brandName">Nethmina</span>
        </a>

        <nav className="navLinks" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#blog">Blog</a>
          <a href="#services">Services</a>
        </nav>

        <Button href="#contact">Contact</Button>
      </div>
    </header>
  );
}
