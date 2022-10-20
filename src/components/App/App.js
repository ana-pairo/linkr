import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "../../common/GlobalStyles";
import SignUp from "../Auth/signUp";
import SignIn from "../Auth/signIn";
import PrivatePage from "../PrivatePage/PrivatePage";
import Timeline from "../Timeline/TimelineContainer";
import Tester from "../Teste";

export default function App() {
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
              <PrivatePage>
                <Timeline />
              </PrivatePage>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
