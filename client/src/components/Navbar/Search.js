import React from 'react'
import useForm from "../../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { search } from "../../actions/searchActions";


const Search = () => {
  const dispatch = useDispatch();

  const [values, handleChange] = useForm({ searchValue: "" })

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(search(values.searchValue))
  }

  return (
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
  )
}

export default Search
