import { useState, useEffect } from "react";
import axios from "axios";

const useGetAuthor = (uid) => {
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const headers = {
      headers: {
          "Content-Type": "application/json"
      }
    }
        
    axios.get(`/api/search/users/${uid}`, headers)
    .then((res) => {
      setUser(res.data.usersRes[0])
    })
    .catch((err) => {
      console.log(err);
    })
        
  }, [])
  
  return user;
}

export default useGetAuthor;