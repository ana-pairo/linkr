import { useContext, useEffect, useState } from "react";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle.js/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import { listPosts } from "../../services/axiosService";
import { RightWrapper, LeftWrapper, Wrapper } from "./PagesStyle";
import CreatePost from "../../common/CreatePost/CreatePost";

export default function Timeline( { page } ) {
  const { showMenu } = useContext(MenuContext);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);

  useEffect(() => {
    setNoPosts(false);
    listTimeLine();
  }, []);

  function listTimeLine(){
    const promise = listPosts();
      promise
          .then(r => {
            setPosts(r.data)
            if(r.data.length === 0){
              setNoPosts(true);
            }
          })
          .catch(e => alert("An error occured while trying to fetch the posts, please refresh the page")); 
  }

  console.log(posts)

  return (
    <>
      <Title showMenu={showMenu}>timeline</Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
          <CreatePost />
          {noPosts? <h1>There are no posts yet</h1> : ""}
          {posts.length === 0 && !noPosts? <h1>Loading...</h1> : posts.map((e,i) => <Post key={i} obj={e} />)}
        </LeftWrapper>
        <RightWrapper>
          <SideBar />
        </RightWrapper>
      </Wrapper>
    </>
  );
}