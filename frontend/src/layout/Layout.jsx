import { NavLink } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="app-layout">
      
      <aside className="sidebar">
        <h2 className="logo">Mini SIEM</h2>

        <nav>
          <NavLink to="/" end className="nav-item">📊 Dashboard</NavLink>
          <NavLink to="/logs" className="nav-item">📄 Logs</NavLink>
          <NavLink to="/alerts" className="nav-item">🚨 Alerts</NavLink>
          <NavLink to="/anomalies" className="nav-item">⚠️ Anomalies</NavLink>
          <NavLink to="/analytics" className="nav-item">📈 Analytics</NavLink>
          <NavLink to="/simulator" className="nav-item">🔥 Simulator</NavLink>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>

    </div>
  );
}

export default Layout;