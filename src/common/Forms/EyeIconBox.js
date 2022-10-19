import styled from "styled-components";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function EyeIconBox({ showPassword, setShowPassword }) {
  return (
    <Wrapper>
      {showPassword ? (
        <BsEye
          color=" rgba(0, 0, 0, 0.5)"
          size="25px"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      ) : (
        <BsEyeSlash
          color=" rgba(0, 0, 0, 0.5)"
          size="25px"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  right: 5%;
  top: 100px;

  @media (max-width: 1000px) {
    right: 3%;
    top: 83px;
  }
`;
