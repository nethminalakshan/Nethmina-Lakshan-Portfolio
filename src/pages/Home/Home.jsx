import Button from "../../components/Button/Button";
import heroImg from "../../assets/images/picto/hero.png";

export default function Home() {
  return (
    <section className="hero" id="home" aria-label="Intro">
      <div className="container heroGrid">
        <div className="heroCopy">
          <p className="eyebrow">Hello, I’m</p>
          <h1>
            Nethmina <span className="heroAccent">Lakshan</span>
          </h1>
          <p className="lead">
            I’m a front-end developer & UI designer based in Sri Lanka. I build
            clean and modern experiences.
          </p>

          <div className="heroActions">
            <Button href="#contact">Say Hello</Button>
          </div>

          <ul className="stats">
            <li className="stat">
              <div className="statValue">15+</div>
              <div className="statLabel">Experience</div>
            </li>
            <li className="stat">
              <div className="statValue">250+</div>
              <div className="statLabel">Project Completed</div>
            </li>
            <li className="stat">
              <div className="statValue">58</div>
              <div className="statLabel">Happy Clients</div>
            </li>
          </ul>
        </div>

        <div className="heroMedia" aria-hidden="true">
          <div className="heroCard">
            <img
              src={heroImg}
              alt=""
              width="520"
              height="520"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
