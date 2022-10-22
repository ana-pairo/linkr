import { useEffect, useState } from "react";
import { validToken } from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { Container } from "../../common/Container/ContainerStyle";
import Header from "../../common/Header/Header";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  const [render, setRender] = useState(<></>);
  const [aux, setAux] = useState("");

  if(aux !== children.props.page){
    setAux(children.props.page);
  } 

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("Linkr"));
    if (!auth) {
      swal("Oops", "Please sign in again", "error");
      localStorage.clear("Linkr");
      navigate("/");
    } else {
      verification();
    }
  }, [aux]);

  async function verification() {
    try {
      await validToken();

      setRender(
        <Container>
          <Header />
          {children}
        </Container>
      );
    } catch (error) {
      swal("Oops", "Please sign in again", "error");
      localStorage.clear("Linkr");
      navigate("/");
    }
  }
  return render;
}
