import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useNavigate } from "react-router-dom"

function DashboardTeam() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    bio: ""
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage(null)

    const { data, error } = await supabase
      .from("members")
      .insert([form])
      .select()
      .single()

    if (error) {
      setMessage({
        type: "error",
        text: "Unable to add team member. Please try again."
      })
    } else {
      setMessage({
        type: "success",
        text: "Team member added successfully!"
      })

      navigate(`/member/${data.id}`)
    }

    setLoading(false)
  }

  return (
    <div className="dashboardTeam">
      <h2 className="dashboardTeam__heading">
        Add New Member
      </h2>

      <form onSubmit={handleSubmit} className="dashboardTeam__form">

        <input
          className="dashboardTeam__input"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="dashboardTeam__input"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <input
          className="dashboardTeam__input"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <textarea
          className="dashboardTeam__textarea"
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          required
        />

        <button
          className="dashboardTeam__button dashboardTeam__button--circle"
          type="submit"
          title="Add Member"
          disabled={loading}
        >
          +
        </button>
      </form>

      {message && (<p style={{ color: message.type === "error" ? "red" : "green" }}> {message.text} </p>)}
    </div>
  )
}

export default DashboardTeam