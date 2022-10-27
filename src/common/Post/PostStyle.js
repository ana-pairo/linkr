import styled from "styled-components";

const PostContainer = styled.div`
  width: 100%;
  background-color: #1e1e1e;
  border-radius: 16px;
`;

const ShareWrapper = styled.div`
  width: 100%;
  min-height: 33px;
  padding: 0 13px;
  font-size: 11px;
  font-weight: 400;
  font-family: "Lato", sans-serif;
  color: #ffffff;
  display: flex;
  align-items: center;
  word-break: break-all;

  strong {
    font-weight: 700;
  }
`;

const CommentsWrapper = styled.div`
  height: ${(props) => (props.isCommentsOpen ? "100%" : "0px")};
  overflow-y: hidden;
  display: flex;
  transition: display 5s;
  align-items: center;
  flex-direction: column;
  background-color: #1e1e1e;
  margin-bottom: 20px;
  border-radius: 16px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

const Comment = styled.div`
  width: 90%;
  height: 70px;
  border-bottom: 1px solid #353535;
  display: flex;
  align-items: center;
  flex-direction: row;

  img {
    margin-right: 20px;
  }
`;

const CommentDescription = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: "Lato", sans-serif;

  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }

  h4 {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
  }
`;

const InputBox = styled.div`
  display: flex;
  height: 70px;
  flex-direction: row;
  align-items: center;
  width: 90%;
  position: relative;

  input {
    height: 40px;
    width: 89%;
    background: #252525;
    border-radius: 8px;
    border: none;
    padding: 0 40px 0 15px;

    font-family: "Lato", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
    outline: none;
    margin-left: 15px;
  }

  input::placeholder {
    font-family: "Lato", sans-serif;
    font-style: italic;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
  }

  div {
    position: absolute;
    right: 30px;
    width: 20px;
    height: 20px;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 611px;
  padding: 20px;
  /* margin-bottom: 20px; */
  border-radius: 16px;
  background-color: #171717;
  display: flex;
  justify-content: space-between;
  font-family: "Lato", sans-serif;

  @media (max-width: 612px) {
    padding: 12px 16px;
    border-radius: 0;
  }
`;

const LeftHandleBar = styled.div`
  min-width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  p {
    margin: 4px 0 20px 0;
    font-size: 11px;
    color: #ffffff;
    cursor: pointer;
  }

  #likesTip {
    color: #505050;
    font-size: 11px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
  }

  @media (max-width: 524px) {
    min-width: 60px;

    img {
      width: 40px;
      height: 40px;
      margin-bottom: 17px;
    }

    p {
      margin-top: 12px;
      font-size: 9px;
    }
  }
`;

const RightHandleBar = styled.div`
  width: 100%;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  font-size: 17px;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .header {
    margin-bottom: 10px;
    font-size: 19px;
    color: #ffffff;
  }

  .header p {
    margin-right: auto;
    color: #ffffff;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    margin-top: 12px;
  }

  .post {
    width: 100%;
    height: auto;
    margin-top: 12px;
    border: 1px solid #4d4d4d;
    border-radius: 11px;
    overflow: hidden;
    cursor: pointer;
  }

  .post .text {
    width: 100%;
    height: 100%;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 11px;
  }

  .post .text h3 {
    margin-bottom: 5px;
    font-size: 16px;
    color: #cecece;
  }

  .post .text h4 {
    margin-bottom: 13px;
    color: #9b9595;
  }

  .post .text p {
    color: #cecece;
  }

  .post img {
    height: auto;
    max-width: 154px;
  }

  p {
    color: #b7b7b7;
    word-break: break-all;
  }

  form textarea {
    width: 100%;
    height: auto;
    padding: 4px 9px;
    font-size: 14px;
    font-family: "Lato", sans-serif;
    background-color: #ffffff;
    color: #4c4c4c;
    border-radius: 7px;
    resize: none;
  }

  form button {
    display: none;
  }

  strong {
    font-weight: 700px;
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 524px) {
    font-size: 15px;

    .header {
      margin-bottom: 7px;
      font-size: 17px;
    }

    .post .text {
      padding: 8px 9px;
      font-size: 11px;
    }

    .post .text h3 {
      font-size: 11px;
    }

    .post .text h4 {
      margin-bottom: 9px;
    }

    .post img {
      width: 100%;
      height: auto;
    }
  }
`;

export {
  PostContainer,
  ShareWrapper,
  PostWrapper,
  LeftHandleBar,
  RightHandleBar,
  CommentsWrapper,
  Comment,
  InputBox,
  CommentDescription,
};
