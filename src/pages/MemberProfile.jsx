import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import CertificateCard from "../components/CertificateCard"

function MemberProfile() {
  const { id } = useParams()

  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMember() {
      const { data, error } = await supabase
        .from("members")
        .select(`
          *,
          certificates (*)
        `)
        .eq("id", id)
        .single()

      console.log("MEMBER:", data)
      console.log("ERROR:", error)

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setMember(data)
      setLoading(false)
    }

    fetchMember()
  }, [id])

  if (loading) return <p>Loading profile...</p>

  if (error) return <p>Error: {error}</p>

  if (!member) {
    return (
      <div>
        <h2>Member not found</h2>
        <Link to="/members">Back to Team</Link>
      </div>
    )
  }

  return (
    <div className="memberProfile">

      <Link to="/members" className="memberProfile__backButton">← Back to Team</Link>

      <h2 className="memberProfile__name">{member.name}</h2>
      <p className="memberProfile__role"> <strong>Role:</strong> {member.role}</p>
      <p className="memberProfile__department"><strong>Department:</strong> {member.department}</p>
      <p className="memberProfile__bio">{member.bio}</p>
      <br />
      <hr />

      <h3 className="memberProfile__certificates">Certificates</h3>

      <div className="memberProfile__certificatesGrid">
        {(member.certificates || []).map(cert => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>

      <br />


    </div>
  )
}

export default MemberProfile


/*
DATA IS BLOCKED BY ROW LEVEL SECURITY (RLS) IN SUPABASE, SO TO ALLOW PUBLIC READ ACCESS, A POLICY MUST BE CREATED IN THE SUPABASE DASHBOARD:

SQL QUERY :

alter table public.certificates enable row level security;

create policy "Allow public read access"
on public.certificates
for select
to anon
using (true);

*/