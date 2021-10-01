import { useState, useEffect } from "react";
import axios from "axios";

const useLike = (bid, uid) => {
  const [likeCount, setLikeCount] = useState(null);

  const likePost = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.post(`/api/posts/${bid}/like`, { uid }, headers)
      .then((res) => {
        setLikeCount(res.data.likes)
      })
      .catch((err) => {
        console.log("err: ", err);
      })
    return likeCount
  }

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
    getLikes()
  }, [])


  return [likeCount, () => {
    likePost()
  }]

}

export default useLike;