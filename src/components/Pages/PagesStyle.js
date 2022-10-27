import styled from "styled-components";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import { listPosts } from "../../services/axiosService";
import { useContext, useEffect, useState } from "react";
import { CreatePostBox } from "../../common/CreatePost/CreatePostStyle";

export default function Timeline() {
  const { showMenu } = useContext(MenuContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    list();
  }, []);

  function list() {
    const promise = listPosts();
    promise.then((r) => setPosts(r.data)).catch((e) => console.log(e.message));
  }

  return (
    <>
      <Title showMenu={showMenu}>timeline</Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
          <CreatePostBox />
          {posts.map((e, i) => (
            <Post postObj={e} key={i} />
          ))}
        </LeftWrapper>
        <RightWrapper>
          <SideBar />
        </RightWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 230px;
  width: 940px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 250px;

  @media (max-width: 1000px) {
    width: 100%;
    justify-content: center;
    top: ${(props) => (props.showMenu ? "270px" : "230px")};
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

  & > .new {
    width: 100%;
    height: 61px; 
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 17px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    cursor: pointer;
  }

`;

const RightWrapper = styled.div`
  width: 301px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

export { RightWrapper, LeftWrapper, Wrapper };
