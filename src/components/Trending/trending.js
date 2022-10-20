import { Header, Body } from "./trendingStyledComponents";
import { ReactTagify } from "react-tagify";


function PostsTrending(){
    return(
        <div className="postsTrending">
            <div className="posts">
                <Posts/>
            </div>
            <TrendingBox/> 
        </div>   
    )
};

function Posts(){
    return(
        <>
        <div className="post">
        jgas
        </div>
        <div className="post">
            jgas
        </div>
        </>
    );
};

function TrendingBox(){
    return(
        <div className="trending">
            <div>
                trending
            </div>
            <div>

            </div>
        </div>
    )
};

export default function Trending(){
    return(
        <>
        <Header>
        <div className="top">
            <div>
                Linkr
            </div>
            <div>
                imageUser
            </div>
        </div>
        </Header>
        <Body>
        <div>
            <div className="tagName">
                <ReactTagify colors={"white"} tagClicked={(tag)=> alert(tag)}>
                    <p>
                        #React
                    </p>
                </ReactTagify>
            </div>
            <PostsTrending/>
        </div>
        </Body>
        </>
    );
};