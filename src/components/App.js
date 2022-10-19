import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "../common/GlobalStyles";

import SignUp from "./SignUp/signUp";

export default function App() {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<> Hello Word </>} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
