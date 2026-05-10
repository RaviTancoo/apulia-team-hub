import { useNavigate, useLocation } from "react-router-dom"

function Login({ setIsAuth }) {
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || "/"

  const handleLogin = () => {
    setIsAuth(true)
    navigate(from, { replace: true })
  }

  return (
    <div className="login">
      <h1 className="login__heading">Staff Login</h1>

      <p className="login__text">
        Access the APULIA staff dashboard.
      </p>

      <button className="login__button" onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

export default Login