import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function SubmitButton({ children, isDisable }) {
  return (
    <Wrapper isDisable={isDisable}>
      {isDisable ? (
        <ThreeDots
          height="20"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
        />
      ) : (
        children
      )}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  outline: #a328d6;
  border-radius: 6px;
  background-color: #1877f2;
  opacity: ${(props) => (props.isDisable ? 0.7 : 1)};
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;

  @media (max-width: 1000px) {
    height: 55px;
    font-size: 22px;
  }
`;
