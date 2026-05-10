import React from "react"

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search team members..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="searchBar"
    />
  )
}

export default SearchBar