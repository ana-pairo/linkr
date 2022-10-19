import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "../common/GlobalStyles";

export default function App() {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<> Hello Word </>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
