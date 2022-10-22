import styled from "styled-components";

const CreatePostBox = styled.div`
  min-height: 209px;
  max-width: 611px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 30px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-family: "Lato", sans-serif;

  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

const LeftHandleBar = styled.div`
  width: 50px;
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
`;

const RightHandleBar = styled.div`
  width: 100%;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  font-size: 17px;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  & > div {
    margin: 5px 0;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
  }

  input, textarea {
    width: 100%;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 0;
    padding: 10px;
  }

  textarea {
    min-height: 66px;
    resize: none;
  }

  button {
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
  }

`;

export { CreatePostBox, RightHandleBar, LeftHandleBar };