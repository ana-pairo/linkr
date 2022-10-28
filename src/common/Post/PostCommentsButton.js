import { useState, useEffect } from "react";
// import UserContext from "../../contexts/UserContext";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import { getTotalComments } from "../../services/axiosService";

function PostComentsButton({ obj, setIsCommentsOpen, isCommentsOpen, renderComments }) {
  //   const [isclicked, setIsclicked] = useState(false);
  // const { userInfo } = useContext(UserContext);
  //   const [postComents, setPostComents] = useState([]);
  const iconComentStyle = {
    color: "#FFFFFF",
    fontSize: "25px",
    cursor: "pointer",
  };
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    getTotalComments(obj.id)
      .then((res) => {
        setTotalComments(res.data.length);
      })
      .catch((error) => console.log(error));
  }, [renderComments]);

  return (
    <Wrapper>
      <AiOutlineComment
        style={iconComentStyle}
        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
      ></AiOutlineComment>
      <p>{totalComments} comments</p>
    </Wrapper>
  );
}

export default PostComentsButton;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
