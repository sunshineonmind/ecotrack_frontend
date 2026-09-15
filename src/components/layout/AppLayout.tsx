import { NavLink, Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">TW</div>
          <div>
            <div className="brand-name">TravelWaste</div>
            <div className="brand-subtitle">Waste Management</div>
          </div>
        </div>

        <nav className="navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/practices"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            Pratiche
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">AD</div>
          <div>
            <strong>Amministratore</strong>
            <span>TravelWaste</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
