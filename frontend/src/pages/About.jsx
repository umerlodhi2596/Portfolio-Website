import AboutHero from "../components/AboutHero";
import AboutSectionHead from "../components/AboutSectionHead";
import EduCard from "../components/EduCard";
import CourseCard from "../components/CourseCard";

import {
  EDUCATION,
  COURSES,
} from "../data/education";

import "../styles/about.css";

export default function AboutPage() {
  return (
    <div className="about-root">
      <AboutHero />

      <section
        className="section"
        id="education"
      >
        <AboutSectionHead
          eyebrow="Academic background"
          title="My"
          accent="Education"
          note="Schools, colleges and courses that shaped my learning journey."
        />

        <div className="edu-grid">
          {EDUCATION.map((item, index) => (
            <EduCard
              key={item.id}
              item={item}
              delay={index * 120}
            />
          ))}
        </div>

        <div className="courses-sub">
          <h3 className="courses-sub-title">
            Courses
          </h3>

          <div className="edu-grid">
            {COURSES.map((item, index) => (
              <CourseCard
                key={item.id}
                item={item}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}