import { useContext, useEffect, useState } from "react";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle.js/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import UserContext from "../../contexts/UserContext";
import { listPostsByUser } from "../../services/axiosService";
import { useNavigate, useParams } from "react-router-dom";
import { RightWrapper, LeftWrapper, Wrapper } from "./PagesStyle";

export default function UserPage( { page } ) {
  const { showMenu } = useContext(MenuContext);
  const { userInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [aux, setAux] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  if(id !== aux){
    setAux(id);
  }

  useEffect(() => {
    setNoPosts(false);
    if(id){
      listUserPosts();
    }
  }, [aux]);

  function listUserPosts(){
    const promise = listPostsByUser(id); 
      promise
          .then(r => {
            setPosts(r.data)
            if(r.data.length === 0){
              setNoPosts(true);
            }
          })
          .catch(e => alert("An error occured while trying to fetch the posts, please refresh the page"));
  }

  return (
    <>
      <Title showMenu={showMenu}>
        <img alt={userInfo.username} src={userInfo.picture} />
        {userInfo.username}
      </Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
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


