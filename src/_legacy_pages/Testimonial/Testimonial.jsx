export default function Testimonial() {
  return (
    <section className="section" aria-label="Testimonial">
      <div className="container testimonial">
        <h2>Testimonial</h2>
        <p className="muted">
          “Nethmina is fast, detail-oriented, and communicates clearly. The final
          result matched the design perfectly.”
        </p>
        <div className="testimonialAuthor">
          <div className="authorDot" aria-hidden="true"></div>
          <div>
            <div className="authorName">Client Name</div>
            <div className="muted">Manager, Example Company</div>
          </div>
        </div>
      </div>
    </section>
  );
}
