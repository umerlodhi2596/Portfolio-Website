import ContactIcon from "./ContactIcon";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">

      <div className="project-card-top">
        <span className="project-number">
          {project.id}
        </span>

        <span className="project-category">
          {project.subtitle}
        </span>

        <span className="project-year">
          {project.createdAt
            ? new Date(project.createdAt).getFullYear()
            : "2026"}
        </span>
      </div>

      <div className="project-card-content">

        <div className="project-info">

          <h2 className="project-title">
            {project.title}
          </h2>

          <p className="project-description">
            {project.description}
          </p>

          <div className="project-technologies">
            {project.technologies?.map((technology) => (
              <span key={technology}>
                {technology}
              </span>
            ))}
          </div>

        </div>

        <div className="project-links">

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="project-arrow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title}`}
            >
              <ContactIcon type="arrow" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="project-github"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          )}

        </div>

      </div>
    </article>
  );
}