import styled from "styled-components";

export default function Title({ children, showMenu }) {
  return <Wrapper showMenu={showMenu}>{children}</Wrapper>;
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

  @media (max-width: 1000px) {
    position: fixed;
    width: 611px;
    top: ${(props) => (props.showMenu ? "190px" : "150px")};
    transition: top 0.5s;
    font-size: 33px;
    line-height: 49px;
    padding-left: 20px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
