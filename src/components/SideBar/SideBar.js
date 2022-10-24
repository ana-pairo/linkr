import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getHashtags } from "../../services/axiosService";

export default function SideBar( { aux } ) {
  const [hashtags, setHashtags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { 
    list();
  }, [aux]);

  function list(){
    const promise = getHashtags();
      promise
          .then(r => {
            setHashtags(r.data);
          })
          .catch(e => console.log(e.message)); 
  }

  return (
    <Wrapper>
      <h1>trending</h1>
      <hr />
      <div>
        {hashtags.length === 0? <h2>Loading...</h2> : hashtags.map((trend, index) => (
          <h2 key={index} onClick={() => navigate("/hashtag/" + trend.name )} > # {trend.name} </h2>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  padding: 10px 0 30px 0;
  position: fixed;

  h1 {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    margin-left: 16px;
  }

  hr {
    border: 0;
    border-top: 0.1px solid #484848;
  }

  div {
    margin: 22px 0 30px 16px;
    max-width: 250px;
  }

  h2 {
    font-weight: 700;
    font-size: 19px;
    line-height: 25px;
    letter-spacing: 0.05em;
    font-family: "Lato", sans-serif;
    color: #ffffff;
    margin-bottom: 4px;
    cursor: pointer;
  }
`;
