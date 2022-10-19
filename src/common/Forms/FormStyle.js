import styled from "styled-components";

const FormBox = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  position: relative;

  input {
    height: 65px;
    background: #ffffff;
    text-decoration: none;
    border: none;
    outline: none;
    border-radius: 6px;
    padding-left: 17px;
    padding-right: 50px;
    margin-bottom: 13px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #9f9f9f;

    @media (max-width: 1000px) {
      height: 55px;
    }
  }

  input::placeholder {
    color: #9f9f9f;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
  }
`;

export default FormBox;
