import { Link, Outlet } from "react-router-dom"

function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        <Link to="" className="dashboard__link">
          Overview
        </Link>

        <Link to="team" className="dashboard__link">
          Team
        </Link>

        <Link to="settings" className="dashboard__link">
          Settings
        </Link>
      </aside>

      <div className="dashboard__content">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard