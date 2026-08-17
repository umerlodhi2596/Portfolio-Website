import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api";

const CreateProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await apiRequest("/projects", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          technologies: form.technologies
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      navigate("/admin/projects");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="page-header">
        <h1>Add Project</h1>
        <p>Add a new project.</p>
      </div>

      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        {/* Project Title */}
        <div className="form-group">
          <label>Project Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="E-Commerce Website"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="form-group">
          <label>Project Subtitle</label>

          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Modern MERN Stack E-Commerce Platform"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            placeholder="Describe your project..."
            required
          />
        </div>

        {/* Technologies */}
        <div className="form-group">
          <label>Technologies</label>

          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        {/* GitHub URL */}
        <div className="form-group">
          <label>GitHub URL</label>

          <input
            type="url"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
          />
        </div>

        {/* Live URL */}
        <div className="form-group">
          <label>Live URL</label>

          <input
            type="url"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="secondary-button"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="primary-button"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;