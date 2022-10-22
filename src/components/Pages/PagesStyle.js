import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 230px;
  width: 940px;
  height: calc(100vh - 250px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1000px) {
    width: 100%;
    justify-content: center;
    top: ${(props) => (props.showMenu ? "270px" : "230px")};
    height: ${(props) =>
      props.showMenu ? "calc(100vh - 290px)" : "calc(100vh - 250px)"};
    transition: top 0.5s;
  }
`;

const LeftWrapper = styled.div`
  width: 611px;
  height: 90%;

  h1 {
    color: white;
    font-size: 30px;
    text-align: center;
  }
`;

const RightWrapper = styled.div`
  width: 301px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export { RightWrapper, LeftWrapper, Wrapper };