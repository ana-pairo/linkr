import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  position: relative;
  justify-content: center;
  background-color: #333333;
  overflow-y: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export { Container };
