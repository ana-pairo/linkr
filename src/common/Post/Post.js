import { useContext, useEffect, useRef, useState } from "react";
import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaRegHeart, FaHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';

import PictureContext from "../../contexts/PictureContext";
import { getPostLikes, likePost, unlikePost } from "../../services/axiosService";

export default function Post({ postObj }) {
  const { userPicture } = useContext(PictureContext);
  const [ isLiked, setIsLiked ] = useState(false);
  const heartStyle = { color: isLiked ? "#AC0000" : "#FFFFFF", fontSize: "20px", cursor: "pointer" };
  const [totalLikes, setTotalLikes] = useState(postObj.likes);
  const totalLikesRef = useRef();

  let postLikes = [];
  useEffect(() => {
    getPostLikes(postObj.id)
    .then(res => {
      postLikes = res.data;
      postLikes.forEach(like => {
        if (like.userId === postObj.userId) {
          setIsLiked(true);
          like.username = "Você";
        };
      });
      postLikes = postLikes.map(post => post.username);
      totalLikesRef.current = postLikes.length;
    })
    .catch(error => console.log(error));
  }, [isLiked, postObj.id, postObj.userId])

  function like() {
    likePost(postObj.id)
    .then(() => {
      setIsLiked(true);
      setTotalLikes(totalLikesRef.current + 1);
    })
    .catch(error => console.log(error));
  }

  function unlike() {
    unlikePost(postObj.id)
    .then(() => {
      setIsLiked(false);
      setTotalLikes(totalLikesRef.current - 1);
    })
    .catch(error => console.log(error));
  }
  console.log(postLikes);

  return (
    <PostWrapper>
      <LeftHandleBar>
        <img src={userPicture} alt="Cutty panda" />
        {
          isLiked
          ? <FaHeart style={heartStyle} onClick={unlike}></FaHeart>
          : <FaRegHeart style={heartStyle} onClick={like}></FaRegHeart>
        }
        <p>{totalLikes} likes</p>
      </LeftHandleBar>
      <RightHandleBar>
        <div className="header">
          <p>Juvenal Juvêncio</p>
          <FaPencilAlt style={{ cursor: "pointer" }}></FaPencilAlt>
          <FaTrash style={{ marginLeft: "13px", cursor: "pointer" }}></FaTrash>
        </div>
        <p>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!{" "}
          <strong>#react</strong> <strong>#material</strong>
        </p>
        <div className="post">
          <div className="text">
            <h3>Como aplicar o Material UI em um projeto React</h3>
            <h4>
              Hey! I have moved this tutorial to my personal blog. Same content,
              new location. Sorry about making you click through to another
              page.
            </h4>
            <p>https://medium.com/@pshrmn/a-simple-react-router</p>
          </div>
          <img
            src="https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png"
            alt="React logo"
          />
        </div>
      </RightHandleBar>
    </PostWrapper>
  );
}

function UsersLikes ({ likesArray }) {
  
}