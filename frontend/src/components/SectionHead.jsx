import useInView from "../hooks/useInView";

export default function SectionHead({
  eyebrow,
  title,
  accent,
  note,
}) {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`section-head${inView ? " in-view" : ""}`}
    >
      <div>
        <span className="section-eyebrow">
          {eyebrow}
        </span>

        <h2 className="section-title">
          {title}{" "}
          <span className="stroke">
            {accent}
          </span>
        </h2>
      </div>

      <p className="section-note">
        {note}
      </p>
    </div>
  );
}