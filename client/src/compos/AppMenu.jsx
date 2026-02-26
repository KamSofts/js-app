import { NavLink } from "react-router-dom";

export default function AppMenu() {
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

  return (
    <nav style={navStyle}>
      {/* Brand / Primary Link */}
      <div>
        <NavLink to="/" style={{ ...linkStyle({}), marginLeft: 0, fontSize: "2rem" , fontWeight: "700", color: "#000" }}>
          KAM
        </NavLink>
      </div>

      {/* Auth / Action Links */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink to="/register" style={linkStyle}>Register</NavLink>
        <NavLink to="/login" style={linkStyle}>Login</NavLink>
      </div>
    </nav>
  );
}
