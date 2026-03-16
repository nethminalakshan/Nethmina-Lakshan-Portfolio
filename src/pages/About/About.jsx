import Button from "../../components/Button/Button";
import heroImg from "../../assets/images/picto/hero.png";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="card aboutCard">
          <div className="aboutMedia">
            <img src={heroImg} alt="" width="420" height="420" loading="lazy" />
          </div>
          <div className="aboutBody">
            <h2>I am a Professional UI/UX Designer</h2>
            <p className="muted">
              I design and develop experiences for customers with a strong focus
              on simplicity, clarity, and usability.
            </p>
            <ul className="bullets">
              <li>Design systems & responsive UI</li>
              <li>React / Vite front-end development</li>
              <li>Landing pages & portfolio sites</li>
            </ul>
            <div className="aboutActions">
              <Button href="#portfolio">My Project</Button>
              <Button href="#contact" variant="ghost">
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
