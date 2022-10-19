import { useEffect, useState } from "react";
import { validToken } from "../../services/axiosService";

function renderError() {
  localStorage.clear("Linkr"); //Nome lá no localStorage
  return <h1>Faça o login antes!</h1>;
}

export default function PrivatePage({ children }) {

  const [render, setRender] = useState(<>{children}</>);
  
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("Linkr")); //Nome lá no localStorage (Aqui tbm)
    if (!auth) {
      setRender(renderError());
    } else { 
      verification();
    } // eslint-disable-next-line
  }, [render]); 

  function verification() {
    const promise = validToken();
      promise
        .then((r) => {
          setRender(
            <>
              {children}
            </>
          );
        })
        .catch(() => {
          setRender(renderError());
        }); 
  }

  return render;
}
