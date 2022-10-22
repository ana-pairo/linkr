import { useContext, useEffect, useState } from "react";
import { validToken } from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { Container } from "../../common/Container/ContainerStyle";
import Header from "../../common/Header/Header";
import UserContext from "../../contexts/UserContext";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  const [render, setRender] = useState(<></>);
  const [aux, setAux] = useState("");
  const { setUserInfo } = useContext(UserContext);

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
      verification(auth);
    }
  }, [aux]);

  async function verification(auth) {
    try {
      await validToken();
      setUserInfo({
        userId: auth.userId,
      })

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
