import styled from "styled-components";

const CreatePostBox = styled.div`
  height: 209px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

export { CreatePostBox };