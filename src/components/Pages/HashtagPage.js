import { useContext, useEffect, useState } from "react";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import { listPostsByHashtag } from "../../services/axiosService";
import { useParams } from "react-router-dom";
import { RightWrapper, LeftWrapper, Wrapper } from "./PagesStyle";

export default function HashtagPage({ page }) {
  const { showMenu } = useContext(MenuContext);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [aux, setAux] = useState("");
  const { hashtag } = useParams();
  const [isDisable, setIsDisable] = useState(false);

  if (hashtag !== aux) {
    setAux(hashtag);
  }

  useEffect(() => {
    setNoPosts(false);
    if (hashtag) {
      listHashtagPosts();
    }
  }, [aux, isDisable]);

  function listHashtagPosts() {
    const promise = listPostsByHashtag(hashtag);
    promise
      .then((r) => {
        setPosts(r.data);
        if (r.data.length === 0) {
          setNoPosts(true);
        }
      })
      .catch((e) =>
        console.log(
          "An error occured while trying to fetch the posts, please refresh the page"
        )
      );
  }

  return (
    <>
      <Title showMenu={showMenu}>#{hashtag}</Title>
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
