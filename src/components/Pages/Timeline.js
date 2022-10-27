import { useContext, useEffect, useState} from "react";
import { useInterval } from 'usehooks-ts';
import swal from "sweetalert";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import { listPosts, getQuant } from "../../services/axiosService";
import { RightWrapper, LeftWrapper, Wrapper } from "./PagesStyle";
import CreatePost from "../../common/CreatePost/CreatePost";
import { TfiReload } from "react-icons/tfi";

export default function Timeline({ page }) {
  const { showMenu } = useContext(MenuContext);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [quant, setQuant] = useState(0);
  const [quantNew, setQuantNew] = useState(0);

  useEffect(() => {
    listTimeLine();
  }, [isDisable]);

  useInterval(() => {
    quantUpdate();
  }, 15000);

  function listTimeLine() {
    setNoPosts(false);
    const promise = listPosts(1);
    promise
      .then((r) => {
        setPosts(r.data.posts);
        setQuant(r.data.quant);
        if (r.data.posts.length === 0) {
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

  function quantUpdate() {
    const promise = getQuant();
    promise
      .then((r) => setQuantNew(r.data))
      .catch(() => console.log("Error"));
  }

  return (
    <>
      <Title showMenu={showMenu}>timeline</Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper>
          <CreatePost listTimeLine={listTimeLine} />
          {quantNew > quant? <div onClick={listTimeLine} className="new" >{quantNew - quant} new {quantNew - quant === 1? "post" : "posts"}, load more! <TfiReload style={{ marginLeft: "6px" }}></TfiReload> </div> : "" }
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
