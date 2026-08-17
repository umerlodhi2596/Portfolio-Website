import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiRequest } from "../services/api";

const Projects = () => {
  // =========================
  // PROJECTS
  // =========================

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // PAGINATION
  // =========================

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalProjects: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // =========================
  // SEARCH
  // =========================

  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  // =========================
  // LOAD PROJECTS
  // =========================

  const loadProjects = async () => {
    try {
      setLoading(true);

      const data = await apiRequest(
        `/projects?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );

      setProjects(data.data || []);

      setPagination(
        data.pagination || {
          currentPage: page,
          limit,
          totalProjects: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error(
        "Failed to load projects:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH PROJECTS
  // =========================

  useEffect(() => {
    loadProjects();
  }, [page, limit, search]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);

    setSearch(searchInput.trim());
  };

  // =========================
  // CLEAR SEARCH
  // =========================

  const handleClearSearch = () => {
    setSearchInput("");

    setSearch("");

    setPage(1);
  };

  // =========================
  // LIMIT CHANGE
  // =========================

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);

    setLimit(newLimit);

    setPage(1);
  };

  // =========================
  // PAGE CHANGE
  // =========================

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

  // =========================
  // DELETE PROJECT
  // =========================

  const deleteProject = async (id) => {
    const confirmed = window.confirm(
      "Delete this project?"
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/projects/${id}`, {
        method: "DELETE",
      });

      // Remove project from current UI
      setProjects((prev) =>
        prev.filter(
          (project) => project._id !== id
        )
      );

      // Update total count
      setPagination((prev) => ({
        ...prev,

        totalProjects: Math.max(
          prev.totalProjects - 1,
          0
        ),
      }));

      /*
       * If only one project existed on the page
       * and we are not on page 1,
       * go to previous page.
       */

      if (
        projects.length === 1 &&
        page > 1
      ) {
        setPage((prev) => prev - 1);
      } else {
        // Refresh current page
        loadProjects();
      }
    } catch (error) {
      console.error(
        "Delete project error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete project"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
  return (
    <div className="admin-loading">
      <div className="admin-loader-ring">
        <div className="admin-loader-inner"></div>
      </div>

      <div className="admin-loader-text">
        <span>LOADING PROJECTS</span>
        <span className="admin-loader-dots">...</span>
      </div>
    </div>
  );
}

  // =========================
  // RENDER
  // =========================

  return (
    <div>

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div className="page-header project-header">

        <div>
          <h1>Projects</h1>

          <p>
            Manage your portfolio projects.
          </p>
        </div>

        <Link
          to="/admin/projects/create"
          className="primary-button"
        >
          + Add Project
        </Link>

      </div>

      {/* =================================
          SEARCH
          SAME CLASS AS MESSAGES
      ================================= */}

      <form
        className="message-search"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search by project title..."
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
        />

        <button type="submit">
          Search
        </button>

        {search && (
          <button
            type="button"
            className="search-clear"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        )}

      </form>

      {/* =================================
          SEARCH RESULT
      ================================= */}

      {search && (
        <div className="search-result-info">

          Searching projects for:{" "}

          <strong>
            "{search}"
          </strong>

        </div>
      )}

      {/* =================================
          PROJECT TABLE
      ================================= */}

      <div className="table-container table-gap">

        <table>

          <thead>

            <tr>

              <th>
                Project
              </th>

              <th>
                Technologies
              </th>

              <th>
                Links
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr key={project._id}>

                {/* PROJECT */}

                <td>

                  <div className="project-info">

                    <div>

                      <strong>
                        {project.title}
                      </strong>

                      <p className="project-subtitle">
                        {project.subtitle}
                      </p>

                      <p>
                        {project.description}
                      </p>

                    </div>

                  </div>

                </td>

                {/* TECHNOLOGIES */}

                <td>

                  <div className="tags">

                    {project.technologies?.map(
                      (tech) => (
                        <span key={tech}>
                          {tech}
                        </span>
                      )
                    )}

                  </div>

                </td>

                {/* LINKS */}

                <td>

                  <div className="links">

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    )}

                  </div>

                </td>

                {/* ACTIONS */}

                <td>

                  <div className="actions">

                    <Link
                      to={`/admin/projects/edit/${project._id}`}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteProject(
                          project._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* =================================
            EMPTY STATE
        ================================= */}

        {projects.length === 0 && (

          <div className="empty-state">

            {search
              ? `No projects found for "${search}".`
              : "No projects found."}

          </div>

        )}

      </div>

      {/* =================================
          PAGINATION
      ================================= */}

      {pagination.totalProjects > 0 && (

        <div className="pagination-container">

          {/* =========================
              PAGINATION INFO
          ========================= */}

          <div className="pagination-info">

            Showing{" "}

            <strong>
              {(page - 1) * limit + 1}
            </strong>

            {" - "}

            <strong>
              {Math.min(
                page * limit,
                pagination.totalProjects
              )}
            </strong>

            {" of "}

            <strong>
              {pagination.totalProjects}
            </strong>

            {" projects"}

          </div>

          {/* =========================
              LIMIT
          ========================= */}

          <div className="pagination-limit">

            <label htmlFor="project-limit">
              Show:
            </label>

            <select
              id="project-limit"
              value={limit}
              onChange={handleLimitChange}
            >

              <option value="5">
                5
              </option>

              <option value="10">
                10
              </option>

              <option value="20">
                20
              </option>

              <option value="50">
                50
              </option>

            </select>

          </div>

          {/* =========================
              PAGE CONTROLS
          ========================= */}

          <div className="pagination-controls">

            {/* PREVIOUS */}

            <button
              disabled={
                !pagination.hasPreviousPage
              }
              onClick={() =>
                handlePageChange(page - 1)
              }
            >
              Previous
            </button>

            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length:
                  pagination.totalPages,
              },
              (_, index) => index + 1
            ).map((pageNumber) => (

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
                {pageNumber}
              </button>

            ))}

            {/* NEXT */}

            <button
              disabled={
                !pagination.hasNextPage
              }
              onClick={() =>
                handlePageChange(page + 1)
              }
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Projects;