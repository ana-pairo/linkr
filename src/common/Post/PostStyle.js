import styled from "styled-components";

const PostWrapper = styled.div`
  width: 100%;
  max-width: 611px;
  min-height: 276px;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: #171717;
  display: flex;
  justify-content: space-between;
  font-family: "Lato", sans-serif;

  @media (max-width: 612px) {
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

  p {
    margin-top: 4px;
    font-size: 11px;
    color: #ffffff;
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
    height: 100%;
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
    width: 154px;
  }

  p {
    color: #b7b7b7;
  }

  strong {
    font-weight: 700px;
    color: #ffffff;
    cursor: pointer;
  }
`;

export { PostWrapper, LeftHandleBar, RightHandleBar };
