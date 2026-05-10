import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import SearchBar from "../components/SearchBar"

function MemberList() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchMembers() {
            const { data, error } = await supabase
                .from("members")
                .select("*")
                .order("name")

            console.log("DATA:", data)
            console.log("ERROR:", error)

            if (error) {
                setError(error.message)
            } else {
                setMembers(data)
            }

            setLoading(false)
        }

        fetchMembers()
    }, [])

    if (loading) return <p>Loading team...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="memberList">
            <h2 className="memberList__heading">Our Team</h2>

            <SearchBar search={search} setSearch={setSearch} />

            <div className="memberList__grid">
                {members.map(m => (
                    <div className="member-card" key={m.id} title="Click Here"
>
                        <h3 className="member-card--name">{m.name}</h3>
                        <p className="member-card--role">{m.role}</p>
                        
                        <Link to={`/member/${m.id}`} className="member-card--link">
                            View Profile
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default MemberList

/*
DATA IS BLOCKED BY ROW LEVEL SECURITY (RLS) IN SUPABASE, SO TO ALLOW PUBLIC READ ACCESS, A POLICY MUST BE CREATED IN THE SUPABASE DASHBOARD:

SQL QUERY :

    create policy "Allow public read access"
    on public.members
    for select
    to anon
    using (true);
 
*/