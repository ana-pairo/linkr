import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import UserContext from "../../contexts/UserContext";
import { getPostLikes, likePost, unlikePost } from "../../services/axiosService";

export default function PostLikes ({ obj }) {
    const [ isLiked, setIsLiked ] = useState(false);
    const heartStyle = { color: isLiked ? "#AC0000" : "#FFFFFF", fontSize: "20px", cursor: "pointer" };
    const [postLikes, setPostLikes] = useState([]);
    const postLikesRef = useRef();
    const [totalLikes, setTotalLikes] = useState(obj.likes);
    const totalLikesRef = useRef();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
      let likes;
      const referencePostId = obj.originalId ? obj.originalId : obj.id;
      getPostLikes(referencePostId)
      .then(res => {
        likes = res.data;
        likes.forEach(like => {
          if (like.userId === userInfo.userId) {
            setIsLiked(true);
            like.username = "Você";
          };
        });
        likes = likes.map(post => post.username);
        totalLikesRef.current = likes.length;
        setPostLikes(likes);
        postLikesRef.current = likes;
        setTotalLikes(likes.length);
      })
      .catch(error => console.log(error));
    }, [isLiked]);

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
        (totalLikes != 0) ?
          <ReactTooltip id={`likesTip${obj.id}`} place="bottom" effect="solid" type="light">
            {renderLikes()}
          </ReactTooltip> :
          ""
      )
    }

    return (
        <>
            {
            isLiked
            ? <FaHeart style={heartStyle} onClick={unlike}></FaHeart>
            : <FaRegHeart style={heartStyle} onClick={like}></FaRegHeart>
            }
            <p data-tip data-for={`likesTip${obj.id}`}>{totalLikes} {totalLikes == 1? "like" : "likes"}</p>
            {renderToolTip()}
        </>
    )
}