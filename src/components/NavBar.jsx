import { NavLink, useNavigate, Outlet } from "react-router-dom"

function NavBar({ isAuth, setIsAuth }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsAuth(false)
    navigate("/", { replace: true })
  }

  return (
    <>
      <nav className="navbar">

        <NavLink to="/" className="nav-link">APULIA</NavLink>

        <div className="nav-links">

          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Team Directory
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Staff Dashboard
          </NavLink>

          {isAuth ? (
            <span className="nav-link logout" onClick={handleLogout}>
              Log Out
            </span>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  )
}

export default NavBar