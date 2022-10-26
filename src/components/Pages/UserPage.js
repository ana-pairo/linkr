import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import UserContext from "../../contexts/UserContext";
import { listPostsByUser } from "../../services/axiosService";
import { useParams } from "react-router-dom";
import { RightWrapper, LeftWrapper, Wrapper } from "./PagesStyle";

export default function UserPage({ page }) {
  const { showMenu } = useContext(MenuContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [aux, setAux] = useState("");
  const { id } = useParams();
  const idNumber = parseInt(id);
  const userId = JSON.parse(localStorage.getItem("Linkr")).userId;
  const [isDisable, setIsDisable] = useState(false);

  if (id !== aux) {
    setAux(id);
  }

  useEffect(() => {
    setNoPosts(false);
    if (id) {
      listUserPosts();
    }
  }, [aux, isDisable]);

  function listUserPosts() {
    const promise = listPostsByUser(id);
    promise
      .then((r) => {
        setUserInfo({
          username: r.data.user.username,
          picture: r.data.user.picture,
        });
        setPosts(r.data.posts);
        if (r.data.length === 0) {
          setNoPosts(true);
        }
      })
      .catch((e) =>
        swal(
          "Oops",
          "An error occured while trying to fetch the posts, please refresh the page",
          "error"
        )
      );
  }

  return (
    <>
      <Title showMenu={showMenu} idNumber={idNumber} userId={userId}>
        <img alt={userInfo.username} src={userInfo.picture} />
        <div> {userInfo.username}</div>
      </Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
          {noPosts ? <h1>There are no posts yet</h1> : ""}
          {posts.length === 0 && !noPosts ? (
            <h1>Loading...</h1>
          ) : (
            posts.map((e, i) => 
              <Post 
                key={i}
                obj={e}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
              />
            )
          )}
        </LeftWrapper>
        <RightWrapper>
          <SideBar />
        </RightWrapper>
      </Wrapper>
    </>
  );
}
