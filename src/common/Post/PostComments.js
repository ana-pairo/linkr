import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineComment } from 'react-icons/ai';
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";

function PostComents(){
    const [ isclicked, setIsclicked ] = useState(false);
    const { userInfo } = useContext(UserContext);
    const [postComents, setPostComents] = useState([]);
    const iconComentStyle = { color: "#FFFFFF", fontSize: "30px", cursor: "pointer" };

    
    function openComments(){
         setIsclicked(true)
    };

    function closeComments(){
       setIsclicked(false)
    };
    
    return(
        <Container>
            <AiOutlineComment style={iconComentStyle} ></AiOutlineComment>
        </Container>
    );
};

export default PostComents;

const Container = styled.div`
margin-bottom: 20px;
`;