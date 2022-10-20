import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { validateSignUpForm, validatePassword } from "./validations";
import { signUp } from "../../services/axiosService";

import {
  Container,
  LeftWrapper,
  RightWrapper,
  StyledLink,
  ValidatePasswordBox,
} from "../../common/Auth/authScreensStyledComponents";
import FormBox from "../../common/Forms/FormStyle";
import EyeIconBox from "../../common/Forms/EyeIconBox";
import SubmitButton from "../../common/Forms/SubmitButton";

export default function SignUp() {
  const navigate = useNavigate();

  const [isDisable, setIsDisable] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    username: "",
    picture: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [checkLength, setCheckLength] = useState(false);
  const [checkNumbers, setCheckNumbers] = useState(false);
  const [checkUpperCase, setCheckUpperCase] = useState(false);
  const [checkSymbols, setCheckSymbols] = useState(false);

  function handleForm(e) {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }

  async function submitForm(e) {
    e.preventDefault();

    setIsDisable(true);

    if (validateSignUpForm({ inputData, setIsDisable, isPasswordValid })) {
      return;
    }

    try {
      await signUp(inputData);

      swal("Ok", "Your account has been successfully created.", "success");

      navigate("/");
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
            onChange={(e) => {
              const value = e.target.value;
              handleForm(e);
              validatePassword({
                value,
                setCheckLength,
                setCheckNumbers,
                setCheckSymbols,
                setCheckUpperCase,
                setIsPasswordValid,
              });
            }}
            value={inputData.password}
          />

          <EyeIconBox
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <ValidatePasswordBox passwordLength={inputData.password.length}>
            <h1>Your password needs to:</h1>
            <h1 style={{ color: `${checkLength ? "green" : "red"}` }}>
              {checkLength ? "✓" : "✗"} Be at least 5 characters long.
            </h1>
            <h1 style={{ color: `${checkNumbers ? "green" : "red"}` }}>
              {checkNumbers ? "✓" : "✗"} Include at least one number
            </h1>
            <h1 style={{ color: `${checkSymbols ? "green" : "red"}` }}>
              {checkSymbols ? "✓" : "✗"} Include at least one symbol.
            </h1>
            <h1 style={{ color: `${checkUpperCase ? "green" : "red"}` }}>
              {checkUpperCase ? "✓" : "✗"} Include at least one upper case
              character.
            </h1>
          </ValidatePasswordBox>

          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleForm}
            value={inputData.username}
          />

          <input
            type="text"
            name="picture"
            placeholder="picture url"
            onChange={handleForm}
            value={inputData.picture}
          />
          <SubmitButton type="submit" isDisable={isDisable}>
            Sign Up
          </SubmitButton>
        </FormBox>
        <StyledLink to="/">Switch back to log in</StyledLink>
      </RightWrapper>
    </Container>
  );
}
