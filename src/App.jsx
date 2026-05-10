import { useState, useEffect, useMemo } from 'react'
import {
  createHashRouter,
  RouterProvider,
  Link,
  Outlet,
  useParams,
  NavLink,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom'

/* COMPONENTS */
import NavBar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"

/* PAGES */
import HomePage from "./pages/HomePage"
import MemberList from "./pages/MemberList"
import MemberProfile from "./pages/MemberProfile"

/* DASHBOARD */
import DashboardOverview from "./pages/dashboards/Overview"
import DashboardTeam from "./pages/dashboards/Team"
import DashboardSettings from "./pages/dashboards/Settings"
import Dashboard from "./pages/dashboards/Dashboard"

import Login from "./pages/Login"

import { supabase } from "./lib/supabase"

import "./App.css"

/* 
   APP + ROUTER
*/

const App = () => {
  const [isAuth, setIsAuth] = useState(false)

  const router = useMemo(() =>
    createHashRouter([
      {
        path: "/",
        element: <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "members", element: <MemberList /> },
          { path: "member/:id", element: <MemberProfile /> },

          { path: "login", element: <Login setIsAuth={setIsAuth} /> },

          {
            path: "dashboard",
            element: (
              <ProtectedRoute isAuth={isAuth}>
                <Dashboard />
              </ProtectedRoute>
            ),
            children: [
              { index: true, element: <DashboardOverview /> },
              { path: "team", element: <DashboardTeam /> },
              { path: "settings", element: <DashboardSettings /> }
            ]
          }
        ]
      }
    ])
    , [isAuth])

  return <RouterProvider router={router} />
}

export default App