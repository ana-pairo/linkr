import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import PictureContext from "../../contexts/PictureContext";
import MenuContext from "../../contexts/MenuContext";
import UserContext from "../../contexts/UserContext";
import GlobalStyles from "../../common/GlobalStyles";
import SignUp from "../Auth/signUp";
import SignIn from "../Auth/signIn";
import PrivatePage from "../PrivatePage/PrivatePage";
import Timeline from "../Pages/Timeline";
import Tester from "../Teste";
import UserPage from "../Pages/UserPage";
import HashtagPage from "../Pages/HashtagPage";

export default function App() {
  const [userPicture, setUserPicture] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  return (
    <>
      <GlobalStyles />
      <PictureContext.Provider value={{ userPicture, setUserPicture }}>
      <MenuContext.Provider value={{ showMenu, setShowMenu }}>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/teste" element={<Tester />} />

          <Route
            path="/timeline"
            element={
                  <PrivatePage>
                    <Timeline page={"timeline"} />
                  </PrivatePage> 
            }
          />
          <Route
            path="/user/:id"
            element={
                  <PrivatePage>
                    <UserPage page={"user"} />
                  </PrivatePage>
            }
          />
          <Route
            path="/hashtag/:hashtag"
            element={
                  <PrivatePage>
                    <HashtagPage page={"hashtag"} />
                  </PrivatePage>
            }
          />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
      </MenuContext.Provider>
      </PictureContext.Provider>
    </>
  );
}
