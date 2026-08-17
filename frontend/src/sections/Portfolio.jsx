import SectionHead from "../components/SectionHead";

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <SectionHead
        eyebrow="Selected work"
        title="My"
        accent="Portfolio"
        note="A showcase of MERN & Next.js projects — add your own case studies here."
      />

      <a
          href="#portfolio"
          className="btn btn-primary"
        >
          View Portfolio →
        </a>
    </section>
  );
}