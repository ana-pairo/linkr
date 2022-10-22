import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaRegHeart, FaHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { getPostLikes, likePost, unlikePost } from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Post({ obj }) {
  const [ isLiked, setIsLiked ] = useState(false);
  const heartStyle = { color: isLiked ? "#AC0000" : "#FFFFFF", fontSize: "20px", cursor: "pointer" };
  const [totalLikes, setTotalLikes] = useState(obj.likes);
  const totalLikesRef = useRef();
  const navigate = useNavigate();
  console.log(obj)

  useEffect(() => {
    let postLikes;
    getPostLikes(obj.id)
    .then(res => {
      postLikes = res.data;
      postLikes.forEach(like => {
        if (like.userId === obj.userId) {
          setIsLiked(true);
          like.username = "Você";
        };
      });
      postLikes = postLikes.map(post => post.username);
      totalLikesRef.current = postLikes.length;
    })
    .catch(error => console.log(error));
  }, [isLiked, obj.id, obj.userId])

  function like() {
    likePost(obj.id)
    .then(() => {
      setIsLiked(true);
      setTotalLikes(totalLikesRef.current + 1);
    })
    .catch(error => console.log(error));
  }

  function unlike() {
    unlikePost(obj.id)
    .then(() => {
      setIsLiked(false);
      setTotalLikes(totalLikesRef.current - 1);
    })
    .catch(error => console.log(error));
  }

  return (
    <PostWrapper>
      <LeftHandleBar>        
        <img src={obj.userPhoto} alt="Cutty panda" onClick={() => navigate("/user/"+ obj.userId)} />
        {
          isLiked
          ? <FaHeart style={heartStyle} onClick={unlike}></FaHeart>
          : <FaRegHeart style={heartStyle} onClick={like}></FaRegHeart>
        }
        <p>{totalLikes} likes</p>
      </LeftHandleBar>
      <RightHandleBar>
        <div className="header">
          <p onClick={() => navigate("/user/"+ obj.userId)}>{obj.username}</p>
          <FaPencilAlt style={{ cursor: "pointer" }}></FaPencilAlt>
          <FaTrash style={{ marginLeft: "13px", cursor: "pointer" }}></FaTrash>
        </div>
        <p>
        {obj.description}
        </p>
        <a href={obj.link} target="_blank" rel="noopener noreferrer">
        <div className="post">
          <div className="text">
            <h3>{obj.linkTitle}</h3>
            <h4>
            {obj.linkDescription}
            </h4>
            <p>{obj.link}</p>
          </div>
          <img
            src={obj.linkImage}
            alt="Link"
          />
        </div>
        </a>
      </RightHandleBar>
    </PostWrapper>
  );
}

function UsersLikes ({ likesArray }) {
  
}