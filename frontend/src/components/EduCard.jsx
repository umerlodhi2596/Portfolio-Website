import useInView from "../hooks/useInView";
import EduIcon from "./EduIcon";

export default function EduCard({ item, delay }) {
  const [ref, inView] = useInView(0.2);

  const isActive = item.status === "In Progress";

  return (
    <div
      ref={ref}
      className={`edu-card${inView ? " in-view" : ""}`}
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
            {item.stage}
          </h3>

          <span
            className={`edu-status${
              isActive ? " active" : ""
            }`}
          >
            {item.status}
          </span>
        </div>

        <p className="edu-institute">
          {item.institute}
        </p>

        <p className="edu-place">
          {item.place}
        </p>
      </div>
    </div>
  );
}