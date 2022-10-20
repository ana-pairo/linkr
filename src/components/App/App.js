import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "../../common/GlobalStyles";
import SignUp from "../Auth/signUp";
import SignIn from "../Auth/signIn";
import PrivatePage from "../PrivatePage/PrivatePage";
import Tester from "../Teste";

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
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/teste" element={<Tester />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
