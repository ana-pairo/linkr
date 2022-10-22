import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle.js/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import { listPosts } from "../../services/axiosService";

export default function Timeline() {
  const { showMenu } = useContext(MenuContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    list();
  }, []);

  function list(){
    const promise = listPosts();
        promise
            .then(r => setPosts(r.data))
            .catch(e => console.log(e.message));
  }

  return (
    <>
      <Title showMenu={showMenu}>timeline</Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
          <CreatePostBox />
          {posts.map((e,i) => <Post postObj={e} key={i} />)}
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
`;

const RightWrapper = styled.div`
  width: 301px;

  @media (max-width: 1000px) {
    display: none;
  }
`;

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
