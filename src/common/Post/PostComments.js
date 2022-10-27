import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { getTotalComments, commentPost } from "../../services/axiosService";
import {
  CommentsWrapper,
  Comment,
  InputBox,
  CommentDescription,
} from "./PostStyle";

export default function PostComments({ isCommentsOpen, obj, setUserInfo, renderComments, setRenderCommensts }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [description, setDescription] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("Linkr"));
  //atualizar o número de comentários quando faz um comentario novo
  function redirect(obj) {
    setUserInfo({
      username: obj.username,
      picture: obj.picture,
    });
    navigate("/user/" + obj.userId);
  }

  function postComment() {
    if (description !== ""){
        const body = {
            description,
            userId: userInfo.userId  
        };
        commentPost(obj.id, body)
          .then((res)=> {
            setRenderCommensts(!renderComments);
          })
          .catch((error) => console.log(error));
    };
  };

  useEffect(() => {
    getTotalComments(obj.id)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => console.log(error));
  }, [renderComments]);

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
                <h3>{comment.username}</h3>
                <h4>{comment.description}</h4>
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
        <input onChange={(e)=> setDescription(e.target.value)} placeholder="write a comment..." />
        <div>
          <IoPaperPlaneOutline size={"20px"} color={"white"} onClick={postComment}/>
        </div>
      </InputBox>
    </CommentsWrapper>
  );
}
