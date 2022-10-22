import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaRegHeart, FaPencilAlt, FaTrash } from "react-icons/fa";

export default function Post( { obj } ) {
  const heartStyle = { color: "#FFFFFF", fontSize: "20px", cursor: "pointer" };

  return (
    <PostWrapper>
      <LeftHandleBar>
        <img src={obj.userPhoto} alt="Cutty panda" />
        <FaRegHeart style={heartStyle}></FaRegHeart>
        <p>{obj.likes} likes</p>
      </LeftHandleBar>
      <RightHandleBar>
        <div className="header">
          <p>{obj.username}</p>
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
