import { useEffect, useState } from "react";

const Navbar = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return (
    <header className="navbar">
      <h2>Admin Panel</h2>

      <div>
        {admin?.username || "Admin"}
      </div>
    </header>
  );
};

export default Navbar;