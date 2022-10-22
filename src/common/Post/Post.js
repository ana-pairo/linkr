import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaRegHeart, FaHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { getPostLikes, likePost, unlikePost } from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import ReactTooltip from 'react-tooltip';
import UserContext from "../../contexts/UserContext";

export default function Post({ obj }) {
  const [ isLiked, setIsLiked ] = useState(false);
  const heartStyle = { color: isLiked ? "#AC0000" : "#FFFFFF", fontSize: "20px", cursor: "pointer" };
  const [postLikes, setPostLikes] = useState([]);
  const postLikesRef = useRef();
  const [totalLikes, setTotalLikes] = useState(obj.likes);
  const totalLikesRef = useRef();
  const navigate = useNavigate(); 
  const { setUserInfo } = useContext(UserContext); 

  function redirect () {
    setUserInfo({
      username: obj.username,
      picture: obj.userPhoto
    }); 
    navigate("/user/"+ obj.userId);
  }

  useEffect(() => {
    let likes;
    getPostLikes(obj.id)
    .then(res => {
      likes = res.data;
      likes.forEach(like => {
        if (like.userId === obj.userId) {
          setIsLiked(true);
          like.username = "Você";
        };
      });
      likes = likes.map(post => post.username);
      totalLikesRef.current = likes.length;
      setPostLikes(likes);
      postLikesRef.current = likes;
    })
    .catch(error => console.log(error));
  }, [isLiked, obj.id, obj.userId]);

  function like() {
    likePost(obj.id)
    .then(() => {
      setIsLiked(true);
      setTotalLikes(totalLikesRef.current + 1);
      setPostLikes([
        ...postLikesRef.current,
        "Você"
      ])
    })
    .catch(error => console.log(error));
  }

  function unlike() {
    unlikePost(obj.id)
    .then(() => {
      setIsLiked(false);
      setTotalLikes(totalLikesRef.current - 1);
      setPostLikes(postLikesRef.current.filter(like => like !== "Você"));
    })
    .catch(error => console.log(error));
  }

  function renderLikes() {
    let render;
    if (isLiked) {
      render = postLikes.filter(username => username !== "Você");
    } else {
      render = postLikes;
    }
    if (totalLikes == 1 && isLiked) {
      return `Você curtiu isso`;
    } else if (totalLikes == 1) {
      return `${render[0]} curtiu isso`;
    } else if (totalLikes == 2 && isLiked) {
      return `Você e ${render[0]} curtiram isso`;
    } else if (totalLikes == 2) {
      return `${render[0]} e ${render[1]} curtiram isso`;
    }

    if (isLiked) {
      return `Você, ${render[0]} e outras ${totalLikes - 2} pessoas`
    }

    return `${render[0]}, ${render[1]} e outras ${totalLikes - 2} pessoas`
  }

  function renderToolTip () {
    return (
      (totalLikes) ?
        <ReactTooltip id="likesTip" place="bottom" effect="solid" type="light">
          {renderLikes()}
        </ReactTooltip> :
        ""
    )
  }

  function redirect () {
    setUserInfo({
      username: obj.username,
      picture: obj.userPhoto
    }); 
    navigate("/user/"+ obj.userId);
  }

  return (
    <PostWrapper>
      <LeftHandleBar>        
        <img src={obj.userPhoto} alt="Cutty panda" onClick={() => redirect()} />
        {
          isLiked
          ? <FaHeart style={heartStyle} onClick={unlike}></FaHeart>
          : <FaRegHeart style={heartStyle} onClick={like}></FaRegHeart>
        }
        <p data-tip data-for="likesTip">{totalLikes} likes</p>
        {renderToolTip()}
      </LeftHandleBar>
      <RightHandleBar>
        <div className="header">
          <p onClick={redirect}>{obj.username}</p>
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