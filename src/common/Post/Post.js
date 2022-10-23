import { LeftHandleBar, PostWrapper, RightHandleBar } from "./PostStyle";
import { FaRegHeart, FaHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { deletePostById, getPostLikes, likePost, unlikePost, updatePost } from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import ReactTooltip from 'react-tooltip';
import UserContext from "../../contexts/UserContext";
import Modal from 'react-modal';
import { ThreeDots } from "react-loader-spinner";

Modal.setAppElement('.root');

const modalStyles = {
  content: {
    height: 'auto',
    minHeight: '262px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333333',
    borderRadius: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  h2: {
    maxWidth: '360px',
    fontSize: '34px',
    fontWeight: '700',
    fontFamily: '"Lato", sans-serif',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '40px'
  },
  cancelButton: {
    width: '134px',
    height: '37px',
    marginRight: '27px',
    backgroundColor: '#ffffff',
    fontSize: '18px',
    fontWeight: '700',
    fontFamily: '"Lato", sans-serif',
    color: '#1877F2',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButton: {
    width: '134px',
    height: '37px',
    backgroundColor: '#1877F2',
    fontSize: '18px',
    fontWeight: '700',
    fontFamily: '"Lato", sans-serif',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default function Post({ obj, isDisable, setIsDisable }) {
  const [ isLiked, setIsLiked ] = useState(false);
  const heartStyle = { color: isLiked ? "#AC0000" : "#FFFFFF", fontSize: "20px", cursor: "pointer" };
  const [postLikes, setPostLikes] = useState([]);
  const postLikesRef = useRef();
  const [totalLikes, setTotalLikes] = useState(obj.likes);
  const totalLikesRef = useRef();
  const navigate = useNavigate(); 
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formInf, setFormInf] = useState({newDescription:obj.description});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let likes;
    getPostLikes(obj.id)
    .then(res => {
      likes = res.data;
      likes.forEach(like => {
        if (like.userId === userInfo.userId) {
          setIsLiked(true);
          like.username = "Você";
        };
      });
      likes = likes.map(post => post.username);
      totalLikesRef.current = likes.length;
      setPostLikes(likes);
      postLikesRef.current = likes;
    })
    .catch(error => console.log(error));
  }, [isLiked, isDisable, obj.id, obj.userId]);

  function like() {
    likePost(obj.id)
    .then(() => {
      setIsLiked(true);
      setTotalLikes(totalLikesRef.current + 1);
      setPostLikes([
        ...postLikesRef.current,
        "Você"
      ])
    })
    .catch(error => console.log(error));
  }

  function unlike() {
    unlikePost(obj.id)
    .then(() => {
      setIsLiked(false);
      setTotalLikes(totalLikesRef.current - 1);
      setPostLikes(postLikesRef.current.filter(like => like !== "Você"));
    })
    .catch(error => console.log(error));
  }

  function renderLikes() {
    let render;
    if (isLiked) {
      render = postLikes.filter(username => username !== "Você");
    } else {
      render = postLikes;
    }
    if (totalLikes == 1 && isLiked) {
      return `Você curtiu isso`;
    } else if (totalLikes == 1) {
      return `${render[0]} curtiu isso`;
    } else if (totalLikes == 2 && isLiked) {
      return `Você e ${render[0]} curtiram isso`;
    } else if (totalLikes == 2) {
      return `${render[0]} e ${render[1]} curtiram isso`;
    }

    if (isLiked) {
      return `Você, ${render[0]} e outras ${totalLikes - 2} pessoas`
    }

    return `${render[0]}, ${render[1]} e outras ${totalLikes - 2} pessoas`
  }

  function renderToolTip () {
    return (
      (totalLikes) ?
        <ReactTooltip id={`likesTip${obj.id}`} place="bottom" effect="solid" type="light">
          {renderLikes()}
        </ReactTooltip> :
        ""
    )
  }

  function redirect () {
    setUserInfo({
      username: obj.username,
      picture: obj.userPhoto
    }); 
    navigate("/user/"+ obj.userId);
  }

  function openModal() {
    setIsOpen(true);
  }

  function deletePost() {
    setIsDisable(true);

    deletePostById(obj.id)
    .then(() => {
      closeModal();
      setIsDisable(false);
    })
    .catch((error) => {
      alert('Could not delete the post');
      console.log(error);
      closeModal();
      setIsDisable(false);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function editPost() {
    isEditing ? resetForm() : setIsEditing(true);
  }

  function onKeyPress(e) {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handleForm();
    }
    if (e.keyCode === 27) resetForm();
  }

  function resetForm () {
    setIsEditing(false);
    setFormInf({
      ...formInf,
      newDescription: obj.description,
    });
  }

  function updateInfs(e){
    setFormInf({
      ...formInf,
      [e.target.name] : e.target.value 
    });
  }

  function focus(e) {
    var val = e.target.value;
    e.target.value = '';
    e.target.value = val;
  }

  function handleForm(e) {
    setIsDisable(true);
    const split = formInf.newDescription.split("#");
    const trends = split.map(e => e.split(" ")[0]);
    trends.shift();
    const body = {...formInf, newTrends: trends}

    const promise = updatePost(obj.id, body);
    promise
      .then((r) => {
        setFormInf({newDescription:formInf.newDescription});
        setIsDisable(false);
        setIsEditing(false);
      })
      .catch(() => {
        alert("An error has occurred on editing post's description");
        setIsDisable(false);
      });
  }
     
  function selectHash(){
    const words = obj.description.split(' ');
    
    return <>{words.map((word, index) => {
      if(word.includes("#")){
        return <strong onClick={() => navigate("/hashtag/" + word.substring(1))} key={index}>{word} </strong>;
      } else {
        return word + " "
      }
    })}</>;
  }

  return (
    <PostWrapper>
      <LeftHandleBar>        
        <img src={obj.userPhoto} alt="Cutty panda" onClick={() => redirect()} />
        {
          isLiked
          ? <FaHeart style={heartStyle} onClick={unlike}></FaHeart>
          : <FaRegHeart style={heartStyle} onClick={like}></FaRegHeart>
        }
        <p data-tip data-for={`likesTip${obj.id}`}>{totalLikes} likes</p>
        {renderToolTip()}
      </LeftHandleBar>
      <RightHandleBar>
        <div className="header">
          <p onClick={redirect}>{obj.username}</p>
          {
            (userInfo.userId === obj.userId) ?
            <>
              <FaPencilAlt style={{ cursor: "pointer" }} onClick={editPost}></FaPencilAlt>
              <FaTrash style={{ marginLeft: "13px", cursor: "pointer" }} onClick={openModal}></FaTrash>
              <Modal
                isOpen={modalIsOpen}
                style={modalStyles}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
              >
              <h2 style={modalStyles.h2}>Are you sure you want to delete this post?</h2>
              <div style={{ display: 'flex' }}>
                {
                  isDisable ? 
                    <>
                      <button style={modalStyles.cancelButton} disabled>
                        <ThreeDots
                          height="20"
                          width="50"
                          radius="9"
                          color="#1877F2"
                          ariaLabel="three-dots-loading"
                        />
                      </button>
                      <button style={modalStyles.confirmButton} disabled>
                        <ThreeDots
                            height="20"
                            width="50"
                            radius="9"
                            color="#ffffff"
                            ariaLabel="three-dots-loading"
                          />
                      </button>
                    </> :
                    <>
                      <button style={modalStyles.cancelButton} onClick={closeModal}>No, go back</button>
                      <button style={modalStyles.confirmButton} onClick={deletePost}>Yes, delete it</button>
                    </>
                }
              </div>
            </Modal>
            </> :
            ""
          }
        </div>
        {
          isEditing ?
            <form onSubmit={handleForm}>
              <textarea type="text" name="newDescription" value={formInf.newDescription}
                placeholder="Awesome article about #javascript" disabled={isDisable}
                onChange={updateInfs} onKeyDown={onKeyPress} autoFocus
                onFocus={focus}
              ></textarea>
              <button disabled={isDisable} type="submit" >
              </button>
            </form> :
            <p>
              {selectHash()}
            </p>
        }
        <a href={obj.link} target="_blank" rel="noopener noreferrer">
        <div className="post">
          <div className="text">
            <h3>{obj.linkTitle}</h3>
            <h4>
            {obj.linkDescription}
            </h4>
            <p>{obj.link}</p>
          </div>
          <img
            src={obj.linkImage}
            alt="Link"
          />
        </div>
        </a>
      </RightHandleBar>
    </PostWrapper>
  );
}