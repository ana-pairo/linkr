import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import PostMetadata from "./PostMetadata";
import PostDescription from "./PostDescription";
import PostLikes from "./PostLikes";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";


export default function Post({ obj, isDisable, setIsDisable }) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formInf, setFormInf] = useState({newDescription:obj.description});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  function redirect () {
    setUserInfo({
      username: obj.username,
      picture: obj.userPhoto
    }); 
    navigate("/user/"+ obj.userId);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function editPost() {
    isEditing ? resetForm() : setIsEditing(true);
  }

  function resetForm () {
    setIsEditing(false);
    setFormInf({
      ...formInf,
      newDescription: obj.description,
    });
  }

  return (
    <PostWrapper>
      <LeftHandleBar>        
        <img src={obj.userPhoto} alt={`User ${obj.username}`} onClick={() => redirect()} />
        <PostLikes obj={obj} />
      </LeftHandleBar>
      <RightHandleBar>
        <div className="header">
          <p onClick={redirect}>{obj.username}</p>
          {
            (userInfo.userId === obj.userId) ?
              <>
                <FaPencilAlt style={{ cursor: "pointer" }} onClick={editPost}></FaPencilAlt>
                <FaTrash style={{ marginLeft: "13px", cursor: "pointer" }} onClick={openModal}></FaTrash>
                <ConfirmationModal
                  obj={obj}
                  modalIsOpen={modalIsOpen}
                  setModalIsOpen={setModalIsOpen}
                  isDisable={isDisable}
                  setIsDisable={setIsDisable}
                  action="delete"
                  message="Are you sure you want to delete this post?"
                  cancelText="No, go back"
                  confirmText="Yes, delete it"
                />
              </> :
              ""
          }
        </div>
        <PostDescription obj={obj}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isDisable={isDisable}
          setIsDisable={setIsDisable}
          formInf={formInf}
          setFormInf={setFormInf}
          resetForm={resetForm} />
        <PostMetadata obj={obj} />
      </RightHandleBar>
    </PostWrapper>
  );
}