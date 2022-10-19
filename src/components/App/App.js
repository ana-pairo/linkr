import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyles from "../common/GlobalStyles";

export default function App() {
  return (
    <>
      <GlobalStyles />
      
      <BrowserRouter>
        <Routes>
          <Route path="/paginaPublica" element={<> Pagina Sem Autenticação </>} />
          <Route path="/paginaPrivada"
            element={
              <PrivatePage>
                <> Pagina Com Autenticação </>
              </PrivatePage>
            }
          /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}
