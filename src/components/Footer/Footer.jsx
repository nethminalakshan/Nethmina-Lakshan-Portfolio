import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="container footerInner">
        <Link className="brand footerBrand" to="/">
          <span className="brandMark" aria-hidden="true">
            N
          </span>
          <span className="brandName">Nethmina</span>
        </Link>

        <div className="footerLinks" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footerCopy">Copyright © 2026</div>
      </div>
    </footer>
  );
}
