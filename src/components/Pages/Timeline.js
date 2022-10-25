import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import { listPosts } from "../../services/axiosService";
import { RightWrapper, LeftWrapper, Wrapper } from "./PagesStyle";
import CreatePost from "../../common/CreatePost/CreatePost";

export default function Timeline({ page }) {
  const { showMenu } = useContext(MenuContext);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    listTimeLine();
  }, [isDisable]);

  function listTimeLine() {
    setNoPosts(false);
    const promise = listPosts();
    promise
      .then((r) => {
        setPosts(r.data);
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
      <Title showMenu={showMenu}>timeline</Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
          <CreatePost listTimeLine={listTimeLine} />
          {noPosts ? <h1>There are no posts yet</h1> : ""}
          {posts.length === 0 && !noPosts ? (
            <h1>Loading...</h1>
          ) : (
            posts.map((e, i) => (
              <Post
                key={i}
                obj={e}
                isDisable={isDisable}
                setIsDisable={setIsDisable}
              />
            ))
          )}
        </LeftWrapper>
        <RightWrapper>
          <SideBar aux={posts} />
        </RightWrapper>
      </Wrapper>
    </>
  );
}
