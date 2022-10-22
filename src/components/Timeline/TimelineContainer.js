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
          .then(r => {
            setPosts(r.data)
            if(r.data.length === 0){
              alert("There are no posts yet");
            }
          })
          .catch(e => alert("An error occured while trying to fetch the posts, please refresh the page")); 
  }

  if(posts.length === 0){
    return (
      <>
        <Title showMenu={showMenu}>timeline</Title>
        <Wrapper showMenu={showMenu}>
          <LeftWrapper>
            <CreatePostBox />
            <h1>Loading...</h1>
          </LeftWrapper>
          <RightWrapper>
            <SideBar />
          </RightWrapper>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <Title showMenu={showMenu}>timeline</Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
          <CreatePostBox />
          {posts.map((e,i) => <Post key={i} obj={e} />)}
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
