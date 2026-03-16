import Button from "../../components/Button/Button";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container servicesGrid">
        <div>
          <h2>What I do?</h2>
          <p className="muted">
            I help teams ship beautiful, responsive, and accessible UI.
          </p>
          <Button href="#contact">Say Hello</Button>
        </div>

        <ul className="serviceCards">
          <li className="miniCard">
            <h3>User Experience (UX)</h3>
            <p className="muted">Wireframes, flows, and UX strategy.</p>
          </li>
          <li className="miniCard">
            <h3>User Interface (UI)</h3>
            <p className="muted">High-fidelity UI with reusable components.</p>
          </li>
          <li className="miniCard">
            <h3>Web Development</h3>
            <p className="muted">React + modern tooling for fast sites.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
