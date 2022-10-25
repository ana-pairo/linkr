import styled from "styled-components";

export default function FollowBox({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 31px;
  position: absolute;
  right: 0;
  top: 17px;
  background-color: #1877f2;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  @media (max-width: 1000px) {
    right: 10px;
  }

  @media (max-width: 600px) {
    width: 95px;
  }
`;
