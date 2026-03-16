import Button from "../../components/Button/Button";

export default function Cta() {
  return (
    <section className="cta" aria-label="Project idea">
      <div className="container ctaInner">
        <div>
          <h2>Do you have a Project Idea?</h2>
          <p className="ctaMuted">Let’s discuss your project!</p>
        </div>
        <Button href="#contact">Let’s work together</Button>
      </div>
    </section>
  );
}
