export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="card contactCard">
          <div className="contactLeft">
            <h2>Let’s discuss your Project</h2>
            <p className="muted">
              Tell me a little about your idea and I’ll get back to you.
            </p>
            <div className="contactList">
              <div>
                <div className="contactLabel">Phone</div>
                <div className="contactValue">+94 7X XXX XXXX</div>
              </div>
              <div>
                <div className="contactLabel">Email</div>
                <div className="contactValue">you@example.com</div>
              </div>
              <div>
                <div className="contactLabel">Location</div>
                <div className="contactValue">Sri Lanka</div>
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
            <div className="fieldRow">
              <label className="field">
                <span>Budget</span>
                <input type="text" name="budget" placeholder="$" />
              </label>
              <label className="field">
                <span>Subject*</span>
                <input type="text" name="subject" required placeholder="Subject" />
              </label>
            </div>
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
