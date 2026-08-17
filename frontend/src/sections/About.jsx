import SectionHead from "../components/SectionHead";

export default function About() {
  return (
    <section className="section" id="about">
      <SectionHead
        eyebrow="Who I am"
        title="About"
        accent="Me"
        note="MERN stack & Next.js developer crafting reliable, production-ready web apps."
      />

      <p className="about-text">
        I'm Umer Safeer Lodhi, a web developer focused
        on the MongoDB, Express, React and Node.js
        stack, with additional specialization in Next.js
        for building performant, SEO-friendly
        applications. I care about clean architecture,
        readable code and interfaces that feel effortless
        to use.
      </p>
    </section>
  );
}