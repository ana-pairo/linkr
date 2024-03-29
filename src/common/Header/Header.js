import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineExpandMore } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import ClickAwayListener from "react-click-away-listener";
import {
  Menu,
  Imagem,
  Wrapper,
  SearchBox,
  SearchOpen,
  Shadow,
} from "./HeaderStyledComponents";
import PictureContext from "../../contexts/PictureContext";
import MenuContext from "../../contexts/MenuContext";
import UserContext from "../../contexts/UserContext";
import { DebounceInput } from "react-debounce-input";
import { listUsersSearch } from "../../services/axiosService";

export default function Header() {
  const { userPicture, setUserPicture } = useContext(PictureContext);
  const { showMenu, setShowMenu } = useContext(MenuContext);
  const [showList, setShowList] = useState(true);
  const [inputBox, setInputBox] = useState({ name: "" });
  const { setUserInfo } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("Linkr"));
    setUserPicture(userData.picture);
    setLoggedUser(userData.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listUsers(search) {
    const promise = listUsersSearch(search);
    promise
      .then((r) => {
        setUsers(r.data);
      })
      .catch((e) => setUsers([]));
  }

  function redirect(e) {
    setUserInfo({
      username: e.username,
      picture: e.picture,
    });
    navigate("/user/" + e.id);
  }

  return (
    <Wrapper>
      <div>
        <h1 onClick={() => navigate("/timeline")}>linkr</h1>
      </div>
      <ClickAwayListener
        onClickAway={() => {
          setShowList(false);
        }}
      >
        <SearchBox showMenu={showMenu}>
          <DebounceInput
            minLength={3}
            placeholder="Search for people"
            value={inputBox.name}
            debounceTimeout={300}
            onChange={(e) => {
              listUsers(e.target.value);
              setInputBox({ name: e.target.value });
              if (!showList) setShowList(true);
            }}
            onClick={() => {
              if (inputBox.name.length > 0) setShowList(true);
            }}
          />
          <div>
            <BsSearch color={"#C6C6C6"} />
          </div>

          <SearchOpen showList={showList}>
            {users.map((e, i) => {
              return (
                <div key={i}>
                  <img
                    alt={e.username}
                    src={e.picture}
                    onClick={() => {
                      redirect(e);
                      setShowList(false);
                      setInputBox({ name: "" });
                      setUsers([]);
                    }}
                  />
                  <p
                    onClick={() => {
                      redirect(e);
                      setShowList(false);
                      setInputBox({ name: "" });
                      setUsers([]);
                    }}
                  >
                    {e.username}
                  </p>
                  {e.follower ? <h1> • following</h1> : ""}
                </div>
              );
            })}
          </SearchOpen>
        </SearchBox>
      </ClickAwayListener>
      <ClickAwayListener onClickAway={() => setShowMenu(false)}>
        <Imagem showMenu={showMenu}>
          <div
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <MdOutlineExpandMore color="white" size="40px" />
          </div>

          <img
            alt="User profile"
            src={userPicture}
            onClick={() => {
              setShowMenu(false);
              navigate("/user/" + loggedUser);
            }}
          />
        </Imagem>
      </ClickAwayListener>

      <Menu
        showMenu={showMenu}
        onClick={() => {
          localStorage.removeItem("Linkr");
          navigate("/");
        }}
      >
        <h1>Logout</h1>
      </Menu>

      <Shadow showMenu={showMenu} />
    </Wrapper>
  );
}
