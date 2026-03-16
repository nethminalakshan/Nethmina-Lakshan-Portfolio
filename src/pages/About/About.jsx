import Button from "../../components/Button/Button";
import heroImg from "../../assets/images/picto/hero.png";

export default function About() {
  return (
    <section className="section" aria-label="About">
      <div className="container">
        <div className="card aboutCard">
          <div className="aboutMedia">
            <img src={heroImg} alt="" width="420" height="420" loading="lazy" />
          </div>
          <div className="aboutBody">
            <h2>Computer Engineering Undergraduate</h2>
            <p className="muted">
              I’m focused on networking and embedded systems, with a practical
              approach to building and documenting engineering projects.
            </p>
            <ul className="bullets">
              <li>Networking fundamentals (TCP/IP, routing, troubleshooting)</li>
              <li>Embedded systems (MCUs, sensors, real-time basics)</li>
              <li>IEEE involvement, hackathons, and project collaboration</li>
            </ul>
            <div className="aboutActions">
              <Button to="/projects">View Projects</Button>
              <Button to="/resume" variant="ghost">
                Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
