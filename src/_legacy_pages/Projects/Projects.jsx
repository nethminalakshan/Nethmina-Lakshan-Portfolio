import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { getProjects, getProjectsByCategory } from "../../data/projects";
import homepageImg from "../../assets/images/picto/Homepage.jpg";
import frameImg from "../../assets/images/picto/Frame-12.png";

const imageCycle = [homepageImg, frameImg];

function normalizeCategory(category) {
  if (!category) return "all";
  if (category === "networking") return "networking";
  if (category === "embedded") return "embedded";
  if (category === "software") return "software";
  return "all";
}

export default function Projects({ category }) {
  const initialCategory = normalizeCategory(category);
  const active = initialCategory;
  const projects = active === "all" ? getProjects() : getProjectsByCategory(active);

  return (
    <section className="section" aria-label="Projects">
      <div className="container">
        <div className="sectionHead">
          <h2>Projects</h2>
          <p className="muted">
            Selected work across networking, embedded systems, and software.
          </p>
        </div>

        <div className="center" style={{ marginTop: 0, marginBottom: "1.2rem" }}>
          <div className="heroActions" aria-label="Project filters">
            <Button
              to="/projects"
              variant={active === "all" ? "primary" : "ghost"}
            >
              All
            </Button>
            <Button
              to="/projects/networking"
              variant={active === "networking" ? "primary" : "ghost"}
            >
              Networking
            </Button>
            <Button
              to="/projects/embedded"
              variant={active === "embedded" ? "primary" : "ghost"}
            >
              Embedded
            </Button>
            <Button
              to="/projects/software"
              variant={active === "software" ? "primary" : "ghost"}
            >
              Software
            </Button>
          </div>
        </div>

        <ul className="gridCards">
          {projects.map((project, index) => (
            <li key={project.id}>
              <article className="projectCard">
                <img
                  className="projectImg"
                  src={imageCycle[index % imageCycle.length]}
                  alt=""
                  loading="lazy"
                />
                <div className="projectBody">
                  <h3>{project.title}</h3>
                  <p className="muted">{project.description}</p>
                  <p className="muted" style={{ margin: "0.6rem 0 0" }}>
                    <strong>Tech:</strong> {project.technologies.join(", ")}
                  </p>
                  <Link className="link" to={`/projects/${project.id}`}>
                    Details →
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

Projects.propTypes = {
  category: PropTypes.string,
};
