import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import "../styles/projects.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 3,
    totalProjects: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // =========================================
  // FETCH PROJECTS
  // =========================================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/projects?page=${page}&limit=${limit}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = await response.json();

        setProjects(result.data || []);

        setPagination(
          result.pagination || {
            currentPage: page,
            limit,
            totalProjects: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          }
        );
      } catch (error) {
        console.error("Projects error:", error);

        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, limit]);

  // =========================================
  // PAGE CHANGE
  // =========================================

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;

    if (
      pagination.totalPages > 0 &&
      newPage > pagination.totalPages
    ) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================
  // LIMIT CHANGE
  // =========================================

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  // =========================================
  // PAGE NUMBERS
  // =========================================

  const renderPageNumbers = () => {
    const pages = [];
    const totalPages = pagination.totalPages;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 4) {
      pages.push("left-dots");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(
      totalPages - 1,
      page + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 3) {
      pages.push("right-dots");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <main className="projects-page">
      <section className="projects-section">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="projects-header">
          <div>
            <p className="section-eyebrow">
              SELECTED WORK
            </p>

            <h1 className="projects-title">
              Things I've
              <span> built.</span>
            </h1>
          </div>

          <p className="projects-intro">
            A selection of projects I've worked on,
            ranging from interactive websites to
            full-stack applications.
          </p>
        </div>

        {/* =====================================
            LOADING
        ===================================== */}

        {loading && (
          <div className="projects-loader">

            <div className="loader-ring">
              <div className="loader-ring-inner" />
            </div>

            <div className="loader-text">
              <span>LOADING</span>
              <span className="loader-dots">
                ...
              </span>
            </div>

          </div>
        )}

        {/* =====================================
            ERROR
        ===================================== */}

        {!loading && error && (
          <div className="projects-status projects-error">
            {error}
          </div>
        )}

        {/* =====================================
            PROJECTS
        ===================================== */}

        {!loading &&
          !error &&
          projects.length > 0 && (
            <>
              <div className="projects-list">

                {projects.map(
                  (project, index) => (
                    <ProjectCard
                      key={project._id}
                      project={{
                        ...project,

                        id: String(
                          (page - 1) * limit +
                            index +
                            1
                        ).padStart(2, "0"),
                      }}
                    />
                  )
                )}

              </div>

              {/* =================================
                  PAGINATION
              ================================= */}

              {pagination.totalPages > 1 && (
                <div className="projects-pagination">

                  {/* META */}

                  <div className="pagination-meta">

                    <span>
                      SHOWING{" "}
                      <strong>
                        {(page - 1) * limit + 1}
                      </strong>

                      {" — "}

                      <strong>
                        {Math.min(
                          page * limit,
                          pagination.totalProjects
                        )}
                      </strong>

                      {" OF "}

                      <strong>
                        {pagination.totalProjects}
                      </strong>
                    </span>

                    <label>
                      <span>SHOW</span>

                      <select
                        value={limit}
                        onChange={handleLimitChange}
                      >
                        <option value="3">
                          3
                        </option>

                        <option value="6">
                          6
                        </option>

                        <option value="9">
                          9
                        </option>

                        <option value="12">
                          12
                        </option>
                      </select>
                    </label>

                  </div>

                  {/* CONTROLS */}

                  <div className="pagination-controls">

                    {/* PREVIOUS */}

                    <button
                      className="pagination-arrow"
                      disabled={
                        !pagination.hasPreviousPage
                      }
                      onClick={() =>
                        handlePageChange(page - 1)
                      }
                    >
                      <span>←</span>
                      <span>PREV</span>
                    </button>

                    {/* PAGE NUMBERS */}

                    <div className="pagination-pages">

                      {renderPageNumbers().map(
                        (
                          pageNumber,
                          index
                        ) => {

                          if (
                            pageNumber ===
                              "left-dots" ||
                            pageNumber ===
                              "right-dots"
                          ) {
                            return (
                              <span
                                key={`${pageNumber}-${index}`}
                                className="pagination-dots"
                              >
                                ...
                              </span>
                            );
                          }

                          return (
                            <button
                              key={pageNumber}
                              className={
                                page === pageNumber
                                  ? "active"
                                  : ""
                              }
                              onClick={() =>
                                handlePageChange(
                                  pageNumber
                                )
                              }
                            >
                              {String(
                                pageNumber
                              ).padStart(2, "0")}
                            </button>
                          );
                        }
                      )}

                    </div>

                    {/* NEXT */}

                    <button
                      className="pagination-arrow"
                      disabled={
                        !pagination.hasNextPage
                      }
                      onClick={() =>
                        handlePageChange(page + 1)
                      }
                    >
                      <span>NEXT</span>
                      <span>→</span>
                    </button>

                  </div>
                </div>
              )}
            </>
          )}

        {/* =====================================
            EMPTY
        ===================================== */}

        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className="projects-status">
              No projects available.
            </div>
          )}

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="projects-footer">
          <span>
            MORE PROJECTS COMING SOON
          </span>

          <div className="projects-line" />

          <span>2026</span>
        </div>

      </section>
    </main>
  );
}