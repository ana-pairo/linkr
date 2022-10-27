import {
  LeftHandleBar,
  PostContainer,
  PostWrapper,
  RightHandleBar,
  ShareWrapper,
} from "./PostStyle";
import { FaPencilAlt, FaShare, FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import PostMetadata from "./PostMetadata";
import PostDescription from "./PostDescription";
import PostLikes from "./PostLikes";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import PostShares from "./PostShares";
import PostCommentsButton from "./PostCommentsButton";
import PostComments from "./PostComments";
import { getOriginalPostUserData } from "../../services/axiosService";

export default function Post({ obj, isDisable, setIsDisable }) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formInf, setFormInf] = useState({ newDescription: obj.description });
  const [isEditing, setIsEditing] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: obj.username,
    userPhoto: obj.userPhoto,
  });

  useEffect(() => {
    if (obj.originalId) {
      getOriginalPostUserData(obj.id)
        .then(res => {
          setUserData({
            username: res.data.username,
            userPhoto: res.data.picture,
          })
        })
        .catch(error => console.log(error));
    }
  }, []);

  function redirect () {
    setUserInfo({
      username: obj.username,
      picture: obj.userPhoto,
    });
    navigate("/user/" + obj.userId);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function editPost() {
    isEditing ? resetForm() : setIsEditing(true);
  }

  function resetForm() {
    setIsEditing(false);
    setFormInf({
      ...formInf,
      newDescription: obj.description,
    });
  }

  return (
    <PostContainer>
      {obj.originalId ? (
        <ShareWrapper>
          <span>
            <FaShare style={{ marginRight: "6px" }}></FaShare>
            Re-posted by{" "}
            <strong>
              {obj.userId === userInfo.userId ? "you" : obj.username}
            </strong>
          </span>
        </ShareWrapper>
      ) : (
        ""
      )}
      <PostWrapper>
        <LeftHandleBar>
          <img
            src={userData.userPhoto}
            alt={`User ${userData.username}`}
            onClick={() => redirect()}
          />
          <PostLikes obj={obj} setIsDisable={setIsDisable} />
          <PostCommentsButton
            obj={obj}
            isCommentsOpen={isCommentsOpen}
            setIsCommentsOpen={setIsCommentsOpen}
          />
          <PostShares
            obj={obj}
            isDisable={isDisable}
            setIsDisable={setIsDisable}
          />
        </LeftHandleBar>
        <RightHandleBar>
          <div className="header">
            <p onClick={redirect}>{userData.username}</p>
            {userInfo.userId === obj.userId ? (
              <>
                {obj.originalId ? (
                  ""
                ) : (
                  <FaPencilAlt
                    style={{ cursor: "pointer" }}
                    onClick={editPost}
                  ></FaPencilAlt>
                )}
                <FaTrash
                  style={{ marginLeft: "13px", cursor: "pointer" }}
                  onClick={openModal}
                ></FaTrash>
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
              </>
            ) : (
              ""
            )}
          </div>
          <PostDescription
            obj={obj}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isDisable={isDisable}
            setIsDisable={setIsDisable}
            formInf={formInf}
            setFormInf={setFormInf}
            resetForm={resetForm}
          />
          <PostMetadata obj={obj} />
        </RightHandleBar>
      </PostWrapper>
      <PostComments
        obj={obj}
        isCommentsOpen={isCommentsOpen}
        setUserInfo={setUserInfo}
      />
    </PostContainer>
  );
}