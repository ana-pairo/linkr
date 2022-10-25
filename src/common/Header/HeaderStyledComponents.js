import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 80px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 4;
  background-color: #151515;

  h1 {
    font-family: "Passion One", cursive;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #ffffff;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    height: 72px;
    padding: 0 20px;

    h1 {
      font-size: 45px;
      line-height: 50px;
    }
  }
`;

const Shadow = styled.div`
  height: 0px;
  @media (max-width: 1000px) {
    position: fixed;
    top: 72px;
    left: 0;
    width: 100%;
    height: ${(props) => (props.showMenu ? "100px" : "70px")};
    z-index: 1;
    background-color: #333333;
    transition: height 0.5s;
  }
`;

const Imagem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  cursor: pointer;

  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
    ${(props) =>
      props.showMenu
        ? "transform: rotate(180deg)"
        : "transform: rotate(360deg)"}
  }

  @media (max-width: 1000px) {
    width: 100px;

    div {
      width: 35px;
    }

    img {
      width: 44px;
      height: 44px;
    }
  }
`;

const Menu = styled.div`
  height: ${(props) => (props.showMenu ? "50px" : "0px")};
  width: 130px;
  overflow-y: hidden;
  transition: height 0.5s;
  background: #171717;
  border-radius: 0px 0px 0px 20px;
  position: absolute;
  top: 80px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #151515;
  z-index: 3;

  h1 {
    opacity: ${(props) => (props.showMenu ? "1" : "0")};
    transition: opacity 0.5s;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }

  @media (max-width: 1000px) {
    height: ${(props) => (props.showMenu ? "43px" : "0px")};
    top: 72px;

    h1 {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const SearchBox = styled.div`
  width: 35vw;
  position: relative;
  z-index: 3;

  input {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    outline: none;
    text-decoration: none;
    border: none;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    padding: 0 40px 0 14px;
    color: black;
  }

  input::placeholder {
    color: rgb(198, 198, 198);
  }

  & > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    position: absolute;
    top: 15px;
    right: 0;
  }

  @media (max-width: 1000px) {
    width: 85%;
    position: absolute;
    top: ${(props) => (props.showMenu ? "122px" : "82px")};
    right: calc(15% / 2);
    transition: top 0.5s;

    input {
      padding: 0 30px 0 14px;
      font-size: 17px;
      line-height: 20px;
    }

    & > div:nth-child(2) {
      width: 30px;
      position: absolute;
      top: 15px;
      right: 1px;
    }
  }
`;

const SearchOpen = styled.div`
  width: 35vw;
  background: #e7e7e7;
  border-radius: 0 0 8px 8px;
  position: fixed;
  transform: translateY(-10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;

  div {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      margin-left: 10px;
      cursor: pointer;
      border-radius: 100%;
      object-fit: cover;
    }

    p {
      font-family: "Lato", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 23px;
      color: #515151;
      margin-left: 10px;
      cursor: pointer;
    }
  }

  & > div:first-child {
    margin-top: 20px;
  }

  & > div:last-child {
    margin-bottom: 10px;
  }

  @media (max-width: 1000px) {
    width: 85%;
  }
`;

export { Menu, Imagem, Wrapper, SearchBox, SearchOpen, Shadow };
