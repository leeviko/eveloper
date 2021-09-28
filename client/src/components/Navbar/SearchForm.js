import React, { useState, useEffect } from 'react'
import useForm from "../../hooks/useForm";
import { Redirect, useHistory } from "react-router-dom";


const SearchForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  const [values, handleChange] = useForm({ searchValue: "" })

  const onSubmit = (e) => {
    e.preventDefault()
    if(!values.searchValue.trim()) {
      setSubmitted(false)
    } else {
      history.push(`/search/${values.searchValue}`)
      setSubmitted(true)
    }
  }

  return (
    <>
      <form className="search-form" onSubmit={(e) => onSubmit(e)}>
        <input
          className="search" 
          placeholder="Search..." 
          name="searchValue" 
          type="text" 
          value={values.searchValue}
          onChange={handleChange}
        />
      </form>      
    </>
    
  )
}

export default SearchForm
