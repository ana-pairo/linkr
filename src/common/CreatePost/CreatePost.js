import { useContext, useState } from "react";
import swal from "sweetalert";
import {
  CreatePostBox,
  RightHandleBar,
  LeftHandleBar,
} from "./CreatePostStyle";
import PictureContext from "../../contexts/PictureContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/axiosService";

export default function CreatePost({ listTimeLine }) {
  const { userPicture } = useContext(PictureContext);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [formInf, setFormInf] = useState({ link: "", description: "" });
  const [disabled, setDisabled] = useState(false);

  function redirect() {
    setUserInfo({
      username: JSON.parse(localStorage.getItem("Linkr")).username,
      picture: userPicture,
    });
    navigate("/user/" + JSON.parse(localStorage.getItem("Linkr")).userId);
  }

  function updateInfs(e) {
    setFormInf({
      ...formInf,
      [e.target.name]: e.target.value,
    });
  }

  function handleForm(e) {
    e.preventDefault();
    setDisabled(true);
    const split = formInf.description.split("#");
    const trends = split.map((e) => e.split(" ")[0]);
    trends.shift();
    const obj = { ...formInf, trends };

    const promise = createPost(obj);
    promise
      .then((r) => {
        setFormInf({ link: "", description: "" });
        listTimeLine(1);
        setDisabled(false);
      })
      .catch(() => {
        swal("Oops", "Something went wrong posting your link", "error");
        setDisabled(false);
      });
  }

  return (
    <CreatePostBox>
      <LeftHandleBar>
        <img onClick={redirect} src={userPicture} />
      </LeftHandleBar>
      <RightHandleBar disabled={disabled}>
        <div>What are you going to share today?</div>
        <form onSubmit={handleForm}>
          <input
            required
            type="url"
            name="link"
            value={formInf.link}
            placeholder="http://..."
            disabled={disabled}
            onChange={updateInfs}
          />
          <textarea
            type="text"
            name="description"
            value={formInf.description}
            placeholder="Awesome article about #javascript"
            disabled={disabled}
            onChange={updateInfs}
          ></textarea>
          <button disabled={disabled} type="submit">
            {disabled ? "Publishing..." : "Publish"}
          </button>
        </form>
      </RightHandleBar>
    </CreatePostBox>
  );
}
