import useInView from "../hooks/useInView";
import EduIcon from "./EduIcon";

export default function CourseCard({ item, delay }) {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`course-card edu-card${
        inView ? " in-view" : ""
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="edu-icon">
        <EduIcon type={item.icon} />
      </div>

      <div className="edu-body">
        <div className="edu-top-row">
          <h3 className="edu-stage">
            {item.title}
          </h3>

          <span className="edu-status grade">
            {item.grade}
          </span>
        </div>

        <p className="edu-institute">
          {item.institute}
        </p>
      </div>
    </div>
  );
}