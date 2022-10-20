import { useEffect, useState } from "react";
import { validToken } from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { Container } from "../../common/Container/ContainerStyle";
import Header from "../../common/Header/Header";

function renderError() {
  localStorage.clear("Linkr"); //Nome lá no localStorage
  return <h1>Faça o login antes!</h1>;
}

export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  const [render, setRender] = useState(
    <Container>
      <Header />
      {children}
    </Container>
  );

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("Linkr")); //Nome lá no localStorage (Aqui tbm)
    if (!auth) {
      swal("Oops", `Loga de novo ai`, "error");
      localStorage.clear("Linkr"); //Nome lá no localStorage
      navigate("/");
    } else {
      verification();
    } // eslint-disable-next-line
  }, [render]);

  function verification() {
    const promise = validToken();
    promise
      .then((r) => {
        setRender(
          <Container>
            <Header />
            {children}
          </Container>
        );
      })
      .catch(() => {
        swal("Oops", `Loga de novo ai`, "error");
        localStorage.clear("Linkr"); //Nome lá no localStorage
        navigate("/");
      });
  }

  return render;
}
