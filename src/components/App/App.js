import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "../../common/GlobalStyles";
import SignUp from "../SignUp/signUp";
import PrivatePage from "../PrivatePage/PrivatePage";

export default function App() {
  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route
            path="/paginaPublica"
            element={<> Pagina Sem Autenticação </>}
          />
          <Route
            path="/paginaPrivada"
            element={
              <PrivatePage>
                <> Pagina Com Autenticação </>
              </PrivatePage>
            }
          />
          <Route path="/" element={<> Hello Word </>} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
