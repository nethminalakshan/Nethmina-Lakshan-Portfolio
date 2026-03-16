import Button from "../../components/Button/Button";
import { portfolioItems } from "../../data/content";
import homepageImg from "../../assets/images/picto/Homepage.jpg";
import frameImg from "../../assets/images/picto/Frame-12.png";

const imageMap = {
  homepage: homepageImg,
  frame: frameImg,
};

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="sectionHead">
          <h2>Portfolio</h2>
          <p className="muted">Some selected projects I’ve worked on.</p>
        </div>

        <ul className="gridCards">
          {portfolioItems.map((item) => (
            <li key={item.id}>
              <article className="projectCard">
                <img
                  className="projectImg"
                  src={imageMap[item.imageKey]}
                  alt=""
                  loading="lazy"
                />
                <div className="projectBody">
                  <h3>{item.title}</h3>
                  <p className="muted">{item.desc}</p>
                  <a className="link" href="#contact">
                    Case Study →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="center">
          <Button href="#contact">More Project</Button>
        </div>
      </div>
    </section>
  );
}
