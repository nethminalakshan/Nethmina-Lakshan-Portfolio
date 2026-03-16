import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import heroImg from "../../assets/images/picto/hero.png";
import { getProjects } from "../../data/projects";
import { getBlogPosts } from "../../data/blog";

export default function Home() {
  const featuredProjects = getProjects().slice(0, 3);
  const latestPosts = getBlogPosts().slice(0, 3);

  return (
    <>
      <section className="hero" aria-label="Intro">
        <div className="container heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Hello, I’m</p>
            <h1>
              Nethmina <span className="heroAccent">Lakshan</span>
            </h1>
            <p className="lead">
              Computer Engineering Undergraduate focused on networking and
              embedded systems.
            </p>

            <div className="heroActions">
              <Button to="/projects">View Projects</Button>
              <Button to="/contact" variant="ghost">
                Contact
              </Button>
            </div>

            <ul className="stats" aria-label="Highlights">
              <li className="stat">
                <div className="statValue">Networking</div>
                <div className="statLabel">Simulation & troubleshooting</div>
              </li>
              <li className="stat">
                <div className="statValue">Embedded</div>
                <div className="statLabel">MCU projects & sensors</div>
              </li>
              <li className="stat">
                <div className="statValue">Software</div>
                <div className="statLabel">Web apps & tooling</div>
              </li>
            </ul>
          </div>

          <div className="heroMedia" aria-hidden="true">
            <div className="heroCard">
              <img
                src={heroImg}
                alt=""
                width="520"
                height="520"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Featured projects">
        <div className="container">
          <div className="sectionHead">
            <h2>Featured Projects</h2>
            <p className="muted">Three projects that best represent my work.</p>
          </div>

          <ul className="gridCards">
            {featuredProjects.map((project) => (
              <li key={project.id}>
                <article className="projectCard">
                  <div className="projectBody">
                    <h3>{project.title}</h3>
                    <p className="muted">{project.description}</p>
                    <Link className="link" to={`/projects/${project.id}`}>
                      Details →
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="center">
            <Button to="/projects">View All Projects</Button>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Skills summary">
        <div className="container">
          <div className="sectionHead">
            <h2>Skills Summary</h2>
            <p className="muted">A quick snapshot of my core strengths.</p>
          </div>

          <ul className="gridCards">
            <li>
              <article className="miniCard">
                <h3>Networking</h3>
                <ul className="bullets" style={{ margin: "0.6rem 0 0" }}>
                  <li>TCP/IP</li>
                  <li>Routing & Subnetting</li>
                  <li>Packet Tracing</li>
                </ul>
              </article>
            </li>
            <li>
              <article className="miniCard">
                <h3>Embedded Systems</h3>
                <ul className="bullets" style={{ margin: "0.6rem 0 0" }}>
                  <li>Microcontrollers</li>
                  <li>Sensor Interfacing</li>
                  <li>Real-time Basics</li>
                </ul>
              </article>
            </li>
            <li>
              <article className="miniCard">
                <h3>Programming</h3>
                <ul className="bullets" style={{ margin: "0.6rem 0 0" }}>
                  <li>C / C++</li>
                  <li>Python</li>
                  <li>JavaScript</li>
                </ul>
              </article>
            </li>
          </ul>

          <div className="center">
            <Button to="/skills" variant="ghost">
              View All Skills
            </Button>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Latest articles">
        <div className="container">
          <div className="sectionHead">
            <h2>Latest Work / Blog</h2>
            <p className="muted">Recent write-ups and notes.</p>
          </div>

          <ul className="gridCards blogGrid">
            {latestPosts.map((post) => (
              <li key={post.id}>
                <article className="blogCard">
                  <div className="blogBody">
                    <p className="blogMeta">{post.date}</p>
                    <h3>{post.title}</h3>
                    <p className="muted" style={{ margin: "0.4rem 0 0" }}>
                      {post.summary}
                    </p>
                    <Link className="link" to={`/blog/${post.id}`}>
                      Read more →
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="center">
            <Button to="/blog" variant="ghost">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      <section className="cta" aria-label="Contact call to action">
        <div className="container ctaInner">
          <div>
            <h2>Want to collaborate?</h2>
            <p className="ctaMuted">Let’s discuss a project or opportunity.</p>
          </div>
          <Button to="/contact">Contact Me</Button>
        </div>
      </section>
    </>
  );
}
