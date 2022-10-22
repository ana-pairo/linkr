import { useContext, useState } from "react";
import { CreatePostBox, RightHandleBar, LeftHandleBar } from "./CreatePostStyle";
import PictureContext from "../../contexts/PictureContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { userPicture } = useContext(PictureContext); 
  const { setUserInfo } = useContext(UserContext); 
  const navigate = useNavigate();
  const [formInf, setFormInf] = useState({link:"", description:""});
  const [disabled, setDisabled] = useState(false);

  function redirect () {
    setUserInfo({
      username: JSON.parse(localStorage.getItem("Linkr")).username,
      picture: userPicture
    }); 
    navigate("/user/"+ JSON.parse(localStorage.getItem("Linkr")).userId);
  }

  function updateInfs(e){
    setFormInf({
      ...formInf,
      [e.target.name] : e.target.value 
    });
  }
 
  function handleForm(e){
    e.preventDefault();
    console.log(formInf);
    setDisabled(true);

    /* 
    const promise = login(formInf);
    promise
      .then((r) => {
        const obj = {token: r.data.token, user: r.data.user};
        localStorage.setItem("myWalletUser", JSON.stringify(obj));
        navigate("/home");
      })
      .catch(() => {
        alert("Erro ao logar!");
        setDisabled(false);
      });   */
  } 

  return (
    <CreatePostBox> 
      <LeftHandleBar>
        <img onClick={redirect} src={userPicture} />
      </LeftHandleBar>
      <RightHandleBar disabled={disabled} >
        <div>What are you going to share today?</div>
        <form onSubmit={handleForm}>
            <input required type="url" name="link" value={formInf.email}
              placeholder="http://..." 
              onChange={updateInfs}
            />
            <textarea type="text" name="description" value={formInf.password}
              placeholder="Awesome article about #javascript" 
              onChange={updateInfs}
            ></textarea>
            <button type="submit" >
              Publish
            </button>
          </form>
      </RightHandleBar>
    </CreatePostBox>
  );
}
       