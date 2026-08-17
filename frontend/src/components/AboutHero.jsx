import useInView from "../hooks/useInView";
import AboutIllustration from "./AboutIllustration";

export default function AboutHero() {
  const [heroRef, heroInView] = useInView(0.15);

  return (
    <section className="section" id="about-us">
      <div
        ref={heroRef}
        className={`about-hero${
          heroInView ? " in-view" : ""
        }`}
      >
        <AboutIllustration />

        <div className="about-copy">
          <span className="eyebrow">
            Get to know me
          </span>

          <h1 className="about-title">
            About{" "}
            <span className="stroke">
              Us
            </span>
          </h1>

          <p className="about-desc">
            I'm{" "}
            <strong>
              Umer Safeer Lodhi
            </strong>
            , a web developer specializing in the{" "}
            <strong>
              MERN stack and Next.js
            </strong>
            . I turn ideas into fast, reliable and
            scalable web applications — handling
            everything from database design and API
            architecture to polished, responsive
            front-ends.
          </p>

          <p className="about-desc">
            My approach blends clean code with
            attention to detail, so every project I
            build is not only functional but also a
            pleasure to use. Whether it's a custom
            dashboard, an e-commerce platform or a
            full SaaS product, I focus on performance,
            maintainability and a smooth user
            experience from start to finish.
          </p>

          <div className="about-cta">
            <a
              href="#contact"
              className="btn btn-primary"
            >
              Contact Now →
            </a>

            <a
              href="/cv/umer-safeer-lodhi-cv.pdf"
              download
              className="btn btn-ghost"
            >
              Download CV ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}