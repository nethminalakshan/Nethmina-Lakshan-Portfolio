import { workSteps } from "../../data/content";

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container processGrid">
        <div>
          <h2>Work Process</h2>
          <p className="muted">A simple, practical workflow to ship quality work.</p>
        </div>

        <ul className="processCards">
          {workSteps.map((step) => (
            <li key={step.title} className="miniCard">
              <h3>{step.title}</h3>
              <p className="muted">{step.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
