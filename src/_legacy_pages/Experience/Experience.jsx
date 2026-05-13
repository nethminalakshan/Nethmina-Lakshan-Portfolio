import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { experienceSections, getExperienceSection } from "../../data/experience";

function normalizeKey(key) {
  if (!key) return "all";
  if (["volunteering", "hackathons", "leadership"].includes(key)) return key;
  return "all";
}

export default function Experience({ category }) {
  const active = normalizeKey(category);
  const sections = (() => {
    if (active === "all") return experienceSections;
    const section = getExperienceSection(active);
    return section ? [section] : experienceSections;
  })();

  return (
    <section className="section" aria-label="Experience">
      <div className="container">
        <div className="sectionHead">
          <h2>Experience</h2>
          <p className="muted">Volunteering, hackathons, and leadership roles.</p>
        </div>

        <div className="center" style={{ marginTop: 0, marginBottom: "1.2rem" }}>
          <div className="heroActions" aria-label="Experience filters">
            <Button
              to="/experience"
              variant={active === "all" ? "primary" : "ghost"}
            >
              Overview
            </Button>
            <Button
              to="/experience/volunteering"
              variant={active === "volunteering" ? "primary" : "ghost"}
            >
              Volunteering
            </Button>
            <Button
              to="/experience/hackathons"
              variant={active === "hackathons" ? "primary" : "ghost"}
            >
              Hackathons
            </Button>
            <Button
              to="/experience/leadership"
              variant={active === "leadership" ? "primary" : "ghost"}
            >
              Leadership
            </Button>
          </div>
        </div>

        <div className="processGrid" style={{ gridTemplateColumns: "1fr" }}>
          {sections.map((section) => (
            <div key={section.key} className="card" style={{ padding: "1.4rem" }}>
              <h3 style={{ marginBottom: "0.4rem" }}>{section.title}</h3>
              <div className="muted" style={{ marginBottom: "1rem" }}>
                {section.items.length} item(s)
              </div>

              <div className="serviceCards">
                {section.items.map((item) => (
                  <article key={`${item.role}-${item.period}`} className="miniCard">
                    <h3 style={{ marginBottom: "0.15rem" }}>{item.role}</h3>
                    <p className="muted" style={{ margin: 0 }}>
                      {item.org} • {item.period}
                    </p>
                    <ul className="bullets" style={{ margin: "0.7rem 0 0" }}>
                      {item.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Experience.propTypes = {
  category: PropTypes.string,
};
