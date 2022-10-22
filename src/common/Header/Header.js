import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineExpandMore } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import ClickAwayListener from "react-click-away-listener";
import { Menu, Imagem, Wrapper, SearchBox, SearchOpen } from "./HeaderStyledComponents";
import PictureContext from "../../contexts/PictureContext";
import MenuContext from "../../contexts/MenuContext";
import {DebounceInput} from 'react-debounce-input';
import { listUsersSearch } from "../../services/axiosService";

export default function Header() {
  const { userPicture, setUserPicture } = useContext(PictureContext);
  const { showMenu, setShowMenu } = useContext(MenuContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("Linkr"));
    setUserPicture(userData.picture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(users);

  function listUsers(search){
    const promise = listUsersSearch(search);
      promise
          .then(r => setUsers(r.data))
          .catch(e => setUsers([]));
  }

  return (
    <Wrapper>
      <div>
        <h1>linkr</h1>
      </div>
      <SearchBox showMenu={showMenu}>
        <DebounceInput
          minLength={3}
          placeholder="Search for people"
          debounceTimeout={300}
          onChange={e => listUsers(e.target.value)} />
        <div>
          <BsSearch color={"#C6C6C6"} />
        </div>
        <SearchOpen>
          {users.map((e) => {
            return (
              <div>
                <img alt={e.username} src={e.picture} />
                <p>{e.username}</p>
              </div>
            );
          })}
        </SearchOpen>
      </SearchBox>
      <ClickAwayListener onClickAway={() => setShowMenu(false)}>
        <Imagem
          showMenu={showMenu}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <div>
            <MdOutlineExpandMore color="white" size="40px" />
          </div>

          <img alt="User profile" src={userPicture} />
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
    </Wrapper>
  );
}
