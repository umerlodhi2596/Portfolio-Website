export default function Hero() {
  return (
    <section className="hero" id="home">
      <span className="hero-eyebrow">
        Available for freelance work
      </span>

      <h1 className="hero-name">
        Umer Safeer
        <br />
        <span className="accent">
          Lodhi
        </span>
      </h1>

      <div className="hero-subtitle-row">
        <span className="typed-subtitle">
          Web Developer
        </span>
      </div>

      <p className="hero-desc">
        I hold{" "}
        <strong>
          expertise in MERN stack development and Next.js
        </strong>
        , building fast, scalable web applications
        from database to deployment — with clean code
        and pixel-sharp interfaces.
      </p>

      <div className="hero-cta">
        <a
          href="#portfolio"
          className="btn btn-primary"
        >
          View Portfolio →
        </a>

        <a
          href="#contact"
          className="btn btn-ghost"
        >
          Contact Me
        </a>
      </div>

      <span className="hero-index">
        SCROLL — 001
      </span>
    </section>
  );
}