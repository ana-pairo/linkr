import swal from "sweetalert";

function validatePassword({
  value,
  setCheckLength,
  setCheckNumbers,
  setCheckSymbols,
  setCheckUpperCase,
  setIsPasswordValid,
}) {
  setCheckLength(value.length > 4);
  setCheckNumbers(value.match(/\d+/) !== null);
  setCheckUpperCase(value.match(/[A-Z]/) !== null);
  setCheckSymbols(value.match(/[^A-Z a-z0-9]/) !== null);

  if (
    value.length > 4 &&
    value.match(/\d+/) !== null &&
    value.match(/[A-Z]/) !== null &&
    value.match(/[^A-Z a-z0-9]/) !== null
  ) {
    setIsPasswordValid(true);
  } else {
    setIsPasswordValid(false);
  }
}

function validateForm({ inputData, setIsDisable, isPasswordValid }) {
  const emailLength = inputData.email.length === 0;
  const passwordLength = inputData.password.length === 0;
  const usernameLength = inputData.username.length === 0;
  const urlLength = inputData.picture.length === 0;
  const email = inputData.email.toLowerCase();
  const url = inputData.picture;

  if (emailLength || passwordLength || usernameLength || urlLength) {
    setIsDisable(false);
    return swal("Oops", "All fields are mandatory.", "warning");
  }

  if (!isPasswordValid) {
    setIsDisable(false);
    return swal("Oops", "Invalid password.", "warning");
  }

  if (
    !(
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null
    )
  ) {
    setIsDisable(false);
    return swal("Oops", "Insert a valid email.", "warning");
  }

  if (
    !(
      url.match(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      ) !== null
    )
  ) {
    setIsDisable(false);
    return swal("Oops", "Insert a valid URL.", "warning");
  }
}

export { validateForm, validatePassword };
