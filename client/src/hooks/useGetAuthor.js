import { useState, useEffect } from "react";
import axios from "axios";

const useGetAuthor = (author_id) => {
  const [author, setAuthor] = useState(null);

  const getAuthor = () => {
    
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.get(`/api/search/users/${author_id}`, headers)
    .then((res) => {
      setAuthor(res.data.usersRes[0])
    })
    .catch((err) => {
      console.log(err);
    })

  }

  useEffect(() => {
    getAuthor()
  }, [])


  return author
}

export default useGetAuthor;