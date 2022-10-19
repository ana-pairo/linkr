import { useState } from "react";

import {
  Container,
  LeftWrapper,
  RightWrapper,
  StyledLink,
} from "./signUpStyledComponents";
import FormBox from "../../common/Forms/FormStyle";
import EyeIconBox from "../../common/Forms/EyeIconBox";
import SubmitButton from "../../common/Forms/SubmitButton";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  return (
    <Container>
      <LeftWrapper>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </LeftWrapper>
      <RightWrapper>
        <FormBox>
          <input type="text" name="email" placeholder="email" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
          />
          <EyeIconBox
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <input type="text" name="username" placeholder="username" />
          <input type="text" name="picture" placeholder="picture url" />
          <SubmitButton isDisable={isDisable}>Sign Up</SubmitButton>
        </FormBox>
        <StyledLink to="/">Switch back to log in</StyledLink>
      </RightWrapper>
    </Container>
  );
}
