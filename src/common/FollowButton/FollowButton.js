import swal from "sweetalert";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkFollows, follow } from "../../services/axiosService";

export default function FollowBox({ userId, setAux, aux }) {
  const pageId = parseInt(useParams().id);
  const data = { follower: userId, followed: pageId };
  const [bottomText, setBottomText] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    const promise = checkFollows({ ...data });

    promise
      .then((r) => {
        setIsFollowed(r.data);
        if (r.data) {
          setBottomText("Unfollow");
        } else {
          setBottomText("Follow");
        }
      })
      .catch((e) => console.log(e));
  }, [isFollowed, aux]);

  async function action() {
    setIsDisable(true);
    try {
      await follow({ ...data });
      setIsDisable(false);
      setIsFollowed(!isFollowed);
      setAux("");
    } catch (error) {
      setIsDisable(false);
      swal("Oops", "An error occured, please try again", "error");
    }
  }

  return (
    <Wrapper disabled={isDisable} onClick={action} isFollowed={isFollowed}>
      {isDisable ? (
        <ThreeDots
          height="20"
          width="80"
          radius="9"
          color={isFollowed ? "#1877f2" : "#ffffff"}
          ariaLabel="three-dots-loading"
        />
      ) : (
        bottomText
      )}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 31px;
  position: absolute;
  right: 0;
  top: 17px;
  /* background-color: #1877f2; */
  background-color: ${(props) => (props.isFollowed ? "#ffffff" : "#1877f2")};
  color: ${(props) => (props.isFollowed ? "#1877f2" : "#ffffff")};
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  border: none;

  @media (max-width: 1000px) {
    right: 10px;
  }

  @media (max-width: 600px) {
    width: 95px;
  }
`;
