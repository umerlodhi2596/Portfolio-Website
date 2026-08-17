import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Portfolio Admin
      </div>

      <nav>
        <NavLink to="/admin/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/admin/projects">
          Projects
        </NavLink>

        <NavLink to="/admin/messages">
          Messages
        </NavLink>
      </nav>

      <button
        className="logout-button"
        onClick={logout}
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;