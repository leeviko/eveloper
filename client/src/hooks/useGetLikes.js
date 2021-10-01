import { useState, useEffect } from "react";
import axios from "axios";

const useGetLikes = (bid) => {
  const [likeCount, setLikeCount] = useState(null);

  const getLikes = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.get(`/api/posts/${bid}/likes`, headers)
      .then((res) => {
        setLikeCount(res.data.likes)
      })
      .catch((err) => {
        console.log("err: ", err);
      })
    return likeCount
  }

  useEffect(() => {
    console.log("sdf");
    getLikes()
  }, [])


  return [likeCount, () => {
    getLikes()
  }]

}

export default useGetLikes;