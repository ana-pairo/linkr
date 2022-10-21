import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import PictureContext from "../../contexts/PictureContext";
import MenuContext from "../../contexts/MenuContext";
import GlobalStyles from "../../common/GlobalStyles";
import SignUp from "../Auth/signUp";
import SignIn from "../Auth/signIn";
import PrivatePage from "../PrivatePage/PrivatePage";
import Timeline from "../Timeline/TimelineContainer";
import Tester from "../Teste";

export default function App() {
  const [userPicture, setUserPicture] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/teste" element={<Tester />} />

          <Route
            path="/timeline"
            element={
              <PictureContext.Provider value={{ userPicture, setUserPicture }}>
                <MenuContext.Provider value={{ showMenu, setShowMenu }}>
                  <PrivatePage>
                    <Timeline />
                  </PrivatePage>
                </MenuContext.Provider>
              </PictureContext.Provider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
