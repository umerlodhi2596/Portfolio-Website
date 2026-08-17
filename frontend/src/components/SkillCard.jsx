import { useEffect, useState } from "react";

export default function SkillCard({
  skill,
  animate,
  delay,
}) {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let raf;

    const duration = 1400;
    const start = performance.now() + delay;

    const tick = (now) => {
      const elapsed = now - start;

      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);

      setDisplayPercent(
        Math.round(progress * skill.percent)
      );

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [animate, delay, skill.percent]);

  return (
    <div
      className={`skill-card${animate ? " in-view" : ""}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="skill-index">
        {skill.index}
      </span>

      <div className="skill-icon">
        {skill.icon}
      </div>

      <h3 className="skill-name">
        {skill.name}
      </h3>

      <p className="skill-role">
        {skill.role}
      </p>

      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: animate
              ? `${skill.percent}%`
              : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>

      <div className="skill-percent-row">
        <span className="skill-percent">
          {displayPercent}%
        </span>

        <span className="skill-level">
          {skill.level}
        </span>
      </div>
    </div>
  );
}