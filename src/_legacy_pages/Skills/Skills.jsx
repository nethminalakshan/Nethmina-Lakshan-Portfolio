import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { getSkillGroup, skillGroups } from "../../data/skills";

function normalizeGroupKey(key) {
  if (!key) return "all";
  if (["networking", "embedded", "programming", "tools"].includes(key)) return key;
  return "all";
}

export default function Skills({ category }) {
  const active = normalizeGroupKey(category);
  const groups = (() => {
    if (active === "all") return skillGroups;
    const group = getSkillGroup(active);
    return group ? [group] : skillGroups;
  })();

  return (
    <section className="section" aria-label="Skills">
      <div className="container">
        <div className="sectionHead">
          <h2>Skills</h2>
          <p className="muted">A clear breakdown of my technical strengths.</p>
        </div>

        <div className="center" style={{ marginTop: 0, marginBottom: "1.2rem" }}>
          <div className="heroActions" aria-label="Skill filters">
            <Button
              to="/skills"
              variant={active === "all" ? "primary" : "ghost"}
            >
              Overview
            </Button>
            <Button
              to="/skills/networking"
              variant={active === "networking" ? "primary" : "ghost"}
            >
              Networking
            </Button>
            <Button
              to="/skills/embedded"
              variant={active === "embedded" ? "primary" : "ghost"}
            >
              Embedded
            </Button>
            <Button
              to="/skills/programming"
              variant={active === "programming" ? "primary" : "ghost"}
            >
              Programming
            </Button>
            <Button
              to="/skills/tools"
              variant={active === "tools" ? "primary" : "ghost"}
            >
              Tools
            </Button>
          </div>
        </div>

        <ul className="gridCards">
          {groups.map((group) => (
            <li key={group.key}>
              <article className="miniCard">
                <h3>{group.title}</h3>
                <ul className="bullets" style={{ margin: "0.6rem 0 0" }}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

Skills.propTypes = {
  category: PropTypes.string,
};
