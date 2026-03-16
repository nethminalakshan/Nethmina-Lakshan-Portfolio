import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getProjectById } from "../../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = getProjectById(id);

  if (!project) {
    return (
      <section className="section" aria-label="Project not found">
        <div className="container">
          <div className="card" style={{ padding: "1.4rem" }}>
            <h2>Project not found</h2>
            <p className="muted">This project ID doesn’t exist.</p>
            <Button to="/projects">Back to Projects</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" aria-label="Project details">
      <div className="container">
        <div className="card" style={{ padding: "1.6rem" }}>
          <p className="muted" style={{ marginTop: 0 }}>
            <Link className="link" to="/projects">
              ← Back to Projects
            </Link>
          </p>

          <h2 style={{ marginBottom: "0.25rem" }}>{project.title}</h2>
          <p className="muted" style={{ marginTop: 0 }}>
            Category: <strong>{project.category}</strong>
          </p>

          <h3>Project Overview</h3>
          <p className="muted">{project.description}</p>

          <h3>Technologies Used</h3>
          <ul className="bullets">
            {project.technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <h3>Key Features</h3>
          <ul className="bullets">
            <li>Clear problem → solution mapping</li>
            <li>Modular design with testable parts</li>
            <li>Documentation focused on reproducibility</li>
          </ul>

          <div className="heroActions" style={{ marginTop: "1rem" }}>
            <Button href={project.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </Button>
            <Button to="/contact" variant="ghost">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
