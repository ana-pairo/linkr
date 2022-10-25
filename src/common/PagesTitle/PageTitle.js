import styled from "styled-components";
import FollowBox from "../FollowButton/FollowButton";

export default function Title({ children, showMenu, userId, idNumber }) {
  if (userId && idNumber) {
    return (
      <Wrapper showMenu={showMenu}>
        {children}
        {userId === idNumber ? "" : <FollowBox>Follow</FollowBox>}
      </Wrapper>
    );
  } else {
    return <Wrapper showMenu={showMenu}>{children}</Wrapper>;
  }
}

const Wrapper = styled.div`
  width: 940px;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  height: 65px;
  position: absolute;
  top: 110px;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 10px;
  }

  @media (max-width: 1000px) {
    position: absolute;
    width: 611px;
    top: ${(props) => (props.showMenu ? "190px" : "150px")};
    transition: top 0.5s;
    font-size: 33px;
    line-height: 49px;
    padding-left: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
    div {
      max-width: 180px;
      max-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @media (max-width: 360px) {
    width: 100%;
    div {
      max-width: 130px;
    }
  }

  @media (max-width: 300px) {
    width: 100%;
    div {
      max-width: 100px;
    }
  }
`;
