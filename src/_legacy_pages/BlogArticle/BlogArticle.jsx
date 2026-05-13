import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { getBlogPostById } from "../../data/blog";

export default function BlogArticle() {
  const { id } = useParams();
  const post = getBlogPostById(id);

  if (!post) {
    return (
      <section className="section" aria-label="Article not found">
        <div className="container">
          <div className="card" style={{ padding: "1.4rem" }}>
            <h2>Article not found</h2>
            <p className="muted">This article ID doesn’t exist.</p>
            <Button to="/blog">Back to Blog</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" aria-label="Blog article">
      <div className="container">
        <div className="card" style={{ padding: "1.6rem" }}>
          <p className="muted" style={{ marginTop: 0 }}>
            <Link className="link" to="/blog">
              ← Back to Blog
            </Link>
          </p>

          <h2 style={{ marginBottom: "0.25rem" }}>{post.title}</h2>
          <p className="muted" style={{ marginTop: 0 }}>
            {post.date}
          </p>

          {post.content.map((paragraph) => (
            <p key={paragraph} className="muted" style={{ margin: "0.85rem 0" }}>
              {paragraph}
            </p>
          ))}

          <div className="heroActions" style={{ marginTop: "1rem" }}>
            <Button to="/projects">View Projects</Button>
            <Button to="/contact" variant="ghost">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
