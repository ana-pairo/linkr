import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  position: relative;
  background-color: #333333;
  color: #ffffff;

  @media (max-width: 1000px) {
    position: initial;
    overflow-y: scroll;
  }
`;

const LeftWrapper = styled.div`
  height: 100%;
  width: 63%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  background-color: #000000;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

  div {
    display: flex;
    flex-direction: column;
    width: 442px;
    position: absolute;
    top: 30%;
    left: 16%;
    font-weight: 700;
  }

  h1 {
    font-family: "Passion One", cursive;
    font-size: 106px;
    line-height: 106px;
    letter-spacing: 0.05em;
  }

  h2 {
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    line-height: 64px;
  }

  @media (max-width: 1000px) {
    position: initial;
    display: flex;
    align-items: center;
    height: 30%;
    min-height: 180px;
    width: 100%;
    flex-wrap: nowrap;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    div {
      width: initial;
      position: initial;
      height: 100%;
      width: 63%;
      min-width: 240px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 700;
    }

    h1 {
      font-size: 76px;
      line-height: 84px;
    }

    h2 {
      font-size: 23px;
      line-height: 34px;
    }
  }
`;

const RightWrapper = styled.div`
  height: 100%;
  width: 37%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;

  @media (max-width: 1000px) {
    position: initial;
    width: 100%;
    height: 70%;
    min-height: 450px;
    padding-top: 40px;
    flex-wrap: nowrap;
    justify-content: initial;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  outline: none;
  text-decoration-line: underline;
  text-decoration-color: rgb(255, 255, 255, 0.5);
  text-underline-offset: 4px;
  color: #ffffff;

  @media (max-width: 1000px) {
    font-size: 17px;
    margin-bottom: 20px;
  }
`;

export { Container, LeftWrapper, RightWrapper, StyledLink };
