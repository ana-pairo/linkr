import { useContext } from "react";
import { CreatePostBox, RightHandleBar, LeftHandleBar } from "./CreatePostStyle";
import PictureContext from "../../contexts/PictureContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { userPicture } = useContext(PictureContext); 
  const { setUserInfo } = useContext(UserContext); 
  const navigate = useNavigate();

  function redirect () {
    setUserInfo({
      username: JSON.parse(localStorage.getItem("Linkr")).username,
      picture: userPicture
    }); 
    navigate("/user/"+ JSON.parse(localStorage.getItem("Linkr")).userId);
  }

  return (
    <CreatePostBox> 
      <LeftHandleBar>
        <img onClick={redirect} src={userPicture} />
      </LeftHandleBar>
      <RightHandleBar>
        Var dar bom... Confia!
      </RightHandleBar>
    </CreatePostBox>
  );
}



        