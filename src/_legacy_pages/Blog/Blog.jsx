import { Link } from "react-router-dom";
import { getBlogPosts } from "../../data/blog";
import homepageImg from "../../assets/images/picto/Homepage.jpg";
import frameImg from "../../assets/images/picto/Frame-12.png";

const imageMap = {
  homepage: homepageImg,
  frame: frameImg,
};

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <section className="section" aria-label="Blog">
      <div className="container">
        <div className="sectionHead">
          <h2>Blog / Articles</h2>
          <p className="muted">Notes on networking and embedded systems.</p>
        </div>

        <ul className="gridCards blogGrid">
          {posts.map((post, index) => (
            <li key={post.id}>
              <article className="blogCard">
                <img
                  className="blogImg"
                  src={index % 2 === 0 ? imageMap.homepage : imageMap.frame}
                  alt=""
                  loading="lazy"
                />
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
      </div>
    </section>
  );
}
