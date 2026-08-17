import { useEffect, useRef, useState } from "react";
import SectionHead from "../components/SectionHead";
import SkillCard from "../components/SkillCard";
import { SKILLS } from "../data/skills";

export default function Skills() {
  const [skillsInView, setSkillsInView] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const node = skillsRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section"
      id="skills"
      ref={skillsRef}
    >
      <SectionHead
        eyebrow="What I work with"
        title="Development"
        accent="Skills"
        note="Core technologies I use to design, build and ship full-stack applications."
      />

      <div className="skills-grid">
        {SKILLS.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            animate={skillsInView}
            delay={index * 120}
          />
        ))}
      </div>
    </section>
  );
}