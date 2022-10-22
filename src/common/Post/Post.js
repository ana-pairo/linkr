import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaRegHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

export default function Post( { obj } ) {
  const heartStyle = { color: "#FFFFFF", fontSize: "20px", cursor: "pointer" };
  const navigate = useNavigate(); 
  const { setUserInfo } = useContext(UserContext); 

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
        <img src={obj.userPhoto} alt="Cutty panda" onClick={redirect} />
        <FaRegHeart style={heartStyle}></FaRegHeart>
        <p>{obj.likes} likes</p>
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
        <a href={obj.link} target="_blank">
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
