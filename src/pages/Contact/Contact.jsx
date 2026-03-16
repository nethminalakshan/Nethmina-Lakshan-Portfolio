export default function Contact() {
  return (
    <section className="section" aria-label="Contact">
      <div className="container">
        <div className="card contactCard">
          <div className="contactLeft">
            <h2>Contact</h2>
            <p className="muted">
              Feel free to reach out via email or connect on LinkedIn.
            </p>
            <div className="contactList">
              <div>
                <div className="contactLabel">Email</div>
                <div className="contactValue">you@example.com</div>
              </div>
              <div>
                <div className="contactLabel">LinkedIn</div>
                <div className="contactValue">linkedin.com/in/your-handle</div>
              </div>
              <div>
                <div className="contactLabel">GitHub</div>
                <div className="contactValue">github.com/your-handle</div>
              </div>
            </div>
          </div>

          <form className="contactForm" onSubmit={(e) => e.preventDefault()}>
            <label className="field">
              <span>Name*</span>
              <input type="text" name="name" required placeholder="Your name" />
            </label>
            <label className="field">
              <span>Email*</span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@email.com"
              />
            </label>
            <label className="field">
              <span>Subject*</span>
              <input type="text" name="subject" required placeholder="Subject" />
            </label>
            <label className="field">
              <span>Message*</span>
              <textarea
                name="message"
                rows="4"
                required
                placeholder="Tell me about your project"
              />
            </label>
            <button className="btn btnPrimary" type="submit">
              Submit →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
