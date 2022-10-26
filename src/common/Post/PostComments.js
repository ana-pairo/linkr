import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { getTotalComments } from "../../services/axiosService";
import {
  CommentsWrapper,
  Comment,
  InputBox,
  CommentDescription,
} from "./PostStyle";
import UserContext from "../../contexts/UserContext";

export default function PostComments({ isCommentsOpen, obj, setUserInfo }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { userInfo } = useContext(UserContext);
  function redirect(obj) {
    setUserInfo({
      username: obj.username,
      picture: obj.picture,
    });
    navigate("/user/" + obj.userId);
  }

  useEffect(() => {
    getTotalComments(obj.id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <CommentsWrapper isCommentsOpen={isCommentsOpen}>
      {comments
        ? comments.map((comment, i) => (
            <Comment key={i}>
              <img
                src={comment.picture}
                alt={`User ${comment.username}`}
                onClick={() => redirect(comment)}
              />
              <CommentDescription>
                <h2>{comment.username}</h2>
                <h1>{comment.description}</h1>
              </CommentDescription>
            </Comment>
          ))
        : ""}
      <InputBox>
        <img
          src={userInfo.picture}
          alt={`User ${userInfo.username}`}
          onClick={() => redirect(userInfo)}
        />
        <input placeholder="write a comment..." />
        <div>
          <IoPaperPlaneOutline size={"20px"} color={"white"} />
        </div>
      </InputBox>
    </CommentsWrapper>
  );
}
