import SectionHead from "../components/SectionHead";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <SectionHead
        eyebrow="Let's build something"
        title="Contact"
        accent="Us"
        note="Have a project in mind? Reach out — I usually reply within a day."
      />

      <a
        href="mailto:hello@umerlodhi.dev"
        className="btn btn-primary contact-button"
      >
        Say Hello →
      </a>
    </section>
  );
}