import { useContext } from "react";
import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaRegHeart, FaPencilAlt, FaTrash } from "react-icons/fa";

import PictureContext from "../../contexts/PictureContext";

export default function Post() {
  const { userPicture } = useContext(PictureContext);
  const heartStyle = { color: "#FFFFFF", fontSize: "20px", cursor: "pointer" };

  return (
    <PostWrapper>
      <LeftHandleBar>
        <img src={userPicture} alt="Cutty panda" />
        <FaRegHeart style={heartStyle}></FaRegHeart>
        <p>13 likes</p>
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
