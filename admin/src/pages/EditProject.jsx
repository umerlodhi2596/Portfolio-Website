import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { apiRequest } from "../services/api";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await apiRequest(
          `/projects/${id}`
        );

        const project = data.data;

        setForm({
          title: project.title || "",
          subtitle: project.subtitle || "",
          description:
            project.description || "",
          technologies:
            project.technologies?.join(", ") || "",
          githubUrl:
            project.githubUrl || "",
          liveUrl:
            project.liveUrl || "",
        });
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await apiRequest(`/projects/${id}`, {
        method: "PUT",
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
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <h1>Edit Project</h1>

        <p>Update your project.</p>
      </div>

      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Project Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Project Subtitle</label>

          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Enter project subtitle"
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Technologies</label>

          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div className="form-group">
          <label>GitHub URL</label>

          <input
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Live URL</label>

          <input
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              navigate("/admin/projects")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;