import { useEffect, useState } from "react";

import { apiRequest } from "../services/api";

const Dashboard = () => {
  const [projects, setProjects] = useState(0);
  const [messages, setMessages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        // Get first page with pagination information
        const projectData = await apiRequest(
          "/projects?page=1&limit=1"
        );

        const messageData = await apiRequest(
          "/messages?page=1&limit=1"
        );

        setProjects(
          projectData.pagination?.totalProjects || 0
        );

        setMessages(
          messageData.pagination?.totalMessages || 0
        );
      } catch (error) {
        console.error(
          "Dashboard Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>

        <p>
          Welcome back to your portfolio admin panel.
        </p>
      </div>

      <div className="stats-grid">

        {/* PROJECTS */}
        <div className="stat-card">
          <span>Total Projects</span>

          <strong>
            {loading ? "..." : projects}
          </strong>
        </div>

        {/* MESSAGES */}
        <div className="stat-card">
          <span>Total Messages</span>

          <strong>
            {loading ? "..." : messages}
          </strong>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;