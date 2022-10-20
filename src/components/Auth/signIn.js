import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { validateSignInForm } from "./validations";
import { signIn } from "../../services/axiosService";

import {
  Container,
  LeftWrapper,
  RightWrapper,
  StyledLink,
} from "../../common/Auth/authScreensStyledComponents";
import FormBox from "../../common/Forms/FormStyle";
import EyeIconBox from "../../common/Forms/EyeIconBox";
import SubmitButton from "../../common/Forms/SubmitButton";

export default function SignIn() {
  const navigate = useNavigate();

  const [isDisable, setIsDisable] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleForm(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function submitForm(e) {
    e.preventDefault();

    setIsDisable(true);

    if (validateSignInForm({ inputData, setIsDisable })) {
      return;
    }

    try {
      // const response = await signIn(inputData);
      const token = "ficticio";
      localStorage.setItem("Linkr", JSON.stringify(token));
      navigate("/teste");
    } catch (error) {
      setIsDisable(false);
      swal("Oops", `${error.response.data}`, "error");
    }
  }

  return (
    <Container>
      <LeftWrapper>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </LeftWrapper>
      <RightWrapper>
        <FormBox isDisable={isDisable} onSubmit={submitForm}>
          <input
            type="text"
            name="email"
            placeholder="e-mail"
            onChange={handleForm}
            value={inputData.email}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            onChange={handleForm}
            value={inputData.password}
          />

          <EyeIconBox
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <SubmitButton type="submit" isDisable={isDisable}>
            Log In
          </SubmitButton>
        </FormBox>
        <StyledLink to="/sign-up">First time? Create an account!</StyledLink>
      </RightWrapper>
    </Container>
  );
}
