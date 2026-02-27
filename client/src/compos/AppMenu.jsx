import { NavLink } from "react-router-dom";
import { useAccess } from "../utils/AccessContext";

export default function AppMenu() {
  const { user, logout } = useAccess();

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #eaeaea",
    fontFamily: "Inter, system-ui, sans-serif"
  };

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#0070f3" : "#666",
    fontWeight: isActive ? "600" : "400",
    marginLeft: "1.5rem",
    fontSize: "0.95rem",
    transition: "color 0.2s ease"
  });

  const logoutButtonStyle = {
    background: 'none',     // Remove default button background
    border: 'none',         // Remove default button border
    padding: "0rem 1rem",   // Remove default padding
    cursor: 'pointer',      // Make it show the "hand" icon on hover
    font: 'inherit',        // Ensure it uses the same font as your links
    display: 'inline-flex', // Align it properly with other links
  };

  return (
    <nav style={navStyle}>
      {/* Brand / Primary Link */}
      <div>
        <NavLink to="/" style={{ ...linkStyle({}), marginLeft: 0, fontSize: "2rem", fontWeight: "700", color: "#000" }}>
          KAM
        </NavLink>
      </div>

      {/* Auth / Action Links */}
      <div style={{ display: "flex", alignItems: "center" }}>

        {user
          ? <>
            <NavLink to="/profile" style={linkStyle}>
              {user?.user_data ? user.user_data.user_name : "Profile"}
            </NavLink>
            <button onClick={logout} style={logoutButtonStyle}>Logout</button>
          </>
          : <>
            <NavLink to="/register" style={linkStyle}>Register</NavLink>
            <NavLink to="/login" style={linkStyle}>Login</NavLink>
          </>}

      </div>
    </nav>
  );
}
