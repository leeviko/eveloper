import React from 'react'
import useForm from "../../hooks/useForm";

const Search = () => {
  const [values, handleChange] = useForm({ searchValue: "" })

  return (
    <form className="search-form">
      <input
        className="search" 
        placeholder="Search..." 
        name="searchValue" 
        type="text" 
        value={values.searchValue}
        onChange={handleChange}
      />
    </form>      
  )
}

export default Search
