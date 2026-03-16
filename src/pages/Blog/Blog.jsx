import { blogItems } from "../../data/content";
import homepageImg from "../../assets/images/picto/Homepage.jpg";
import frameImg from "../../assets/images/picto/Frame-12.png";

const imageMap = {
  homepage: homepageImg,
  frame: frameImg,
};

export default function Blog() {
  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="sectionHead">
          <h2>Blog</h2>
          <p className="muted">Short notes on design and development.</p>
        </div>

        <ul className="gridCards blogGrid">
          {blogItems.map((post) => (
            <li key={post.title}>
              <article className="blogCard">
                <img
                  className="blogImg"
                  src={imageMap[post.imageKey]}
                  alt=""
                  loading="lazy"
                />
                <div className="blogBody">
                  <p className="blogMeta">{post.date}</p>
                  <h3>{post.title}</h3>
                  <a className="link" href="#contact">
                    Read more →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
