import Button from "../../components/Button/Button";

export default function Resume() {
  return (
    <section className="section" aria-label="Resume">
      <div className="container">
        <div className="sectionHead">
          <h2>Resume</h2>
          <p className="muted">
            Add your PDF as <strong>public/resume.pdf</strong> to enable preview and download.
          </p>
        </div>

        <div className="card" style={{ padding: "1.2rem" }}>
          <div className="heroActions" style={{ marginBottom: "1rem" }}>
            <Button href="/resume.pdf" target="_blank" rel="noreferrer">
              Download PDF
            </Button>
            <Button to="/contact" variant="ghost">
              Contact
            </Button>
          </div>

          <iframe
            title="Resume preview"
            src="/resume.pdf"
            style={{
              width: "100%",
              height: "70vh",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              background: "var(--surface)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
