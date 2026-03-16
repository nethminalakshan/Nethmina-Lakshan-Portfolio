import "./Footer.css";

export default function Footer() {
  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="container footerInner">
        <a className="brand footerBrand" href="#top">
          <span className="brandMark" aria-hidden="true">
            N
          </span>
          <span className="brandName">Nethmina</span>
        </a>

        <div className="footerLinks" aria-label="Footer">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footerCopy">Copyright © 2026</div>
      </div>
    </footer>
  );
}
