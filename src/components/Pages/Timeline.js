import { useContext, useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";
import swal from "sweetalert";
import Post from "../../common/Post/Post";
import SideBar from "../SideBar/SideBar";
import Title from "../../common/PagesTitle/PageTitle";
import MenuContext from "../../contexts/MenuContext";
import { listPosts, getQuant } from "../../services/axiosService";
import { RightWrapper, LeftWrapper, Wrapper } from "./PagesStyle";
import CreatePost from "../../common/CreatePost/CreatePost";
import { TfiReload } from "react-icons/tfi";
import { Oval } from 'react-loader-spinner';

export default function Timeline({ page }) {
  const { showMenu } = useContext(MenuContext);
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [noFollowing, setNoFollowing] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [quant, setQuant] = useState(0);
  const [quantNew, setQuantNew] = useState(0);
  const [count, setCount] = useState(1);
  let oneTime = false;
  const container = useRef();
  
  console.log("quant " + quant);
  console.log("posts" + posts.length);

  useEffect(() => {
    listTimeLine(count);
  }, [isDisable]);

  useEffect(() => { 
    if(container.current){
      const observer = new IntersectionObserver(() => {
        if(oneTime){
          listTimeLine(count+1); 
          setCount(count+1);
        }else{
          oneTime = true;
        }
      });

      observer.observe(container.current);

      return () => observer.disconnect(); 
    }
  },[quant]);

  useInterval(() => {
    quantUpdate();
  }, 15000);

  function listTimeLine(n) {
    setNoPosts(false);
    setNoFollowing(false);
    const promise = listPosts(n);
    promise
      .then((r) => {
        setPosts(r.data.posts);
        setQuant(r.data.quant);
        setNoFollowing(!r.data.following);

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
    promise.then((r) => setQuantNew(r.data)).catch(() => console.log("Error"));
  }

  return (
    <>
      <Title showMenu={showMenu}>timeline</Title>
      <Wrapper showMenu={showMenu}>
        <LeftWrapper >
          <CreatePost listTimeLine={listTimeLine} />
          {quantNew > quant ? (
            <div onClick={() => listTimeLine(count)} className="new">
              {quantNew - quant} new {quantNew - quant === 1 ? "post" : "posts"}
              , load more! <TfiReload style={{ marginLeft: "6px" }}></TfiReload>{" "}
            </div>
          ) : (
            ""
          )}

          {noFollowing ? (
            <h1>You don't follow anyone yet. Search for new friends!</h1>
          ) : noPosts ? (
            <h1>No posts found from your friends</h1>
          ) : (
            ""
          )}
          
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
          {count*10 < quant? <div ref={container} >loading...</div> : ""}
          {Number(quant) === posts.length? "" : 
            <div className="loader" >
              <Oval
                height={27}
                width={27}
                color="#333333"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#6D6D6D"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
              <p>Loading more posts...</p>
            </div>
          }
        </LeftWrapper>
        <RightWrapper>
          <SideBar aux={posts} />
        </RightWrapper>
      </Wrapper>
    </>
  );
}
