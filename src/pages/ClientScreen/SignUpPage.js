import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { changeSignUpIsLoad, changeSuccessModalData, changeWarningModalData } from "../../store/clientSide/services/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import FormGroup from "../../components/FormComponents/FormGroup";
import Label from "../../components/FormComponents/Label";
import TextField from "../../components/FormComponents/TextField";
import EmailField from "../../components/FormComponents/EmailField";
import PasswordField from "../../components/FormComponents/PasswordField";
import Button from "../../components/FormComponents/Button";

function RegistrationForm({history}) {
  const state = useSelector(state=>{
    return {signUpIsLoad: state.client_services.signUpIsLoad}
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    const elem = e.target;
    let newObj = {
      name: elem.name.value,
      email: elem.email.value,
      password: elem.password.value,
    };
    dispatch(changeSignUpIsLoad(true));
    fetch(`${SERVERDOMAIN}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
    .then((data) => data.json())
    .then((data) => {
      dispatch(changeSignUpIsLoad(false));
        if (!data.success) {
          dispatch(changeWarningModalData({
            msg: data.msg
          }));
          document.getElementById("callWarningModalBtn").click();
        } else {
          dispatch(changeSuccessModalData({
            msg: `Congratulations! ${data.user.name} you are registered`, 
            backBtnTxt: "Back to the main page", 
            backTo: "/"
          }));
          document.getElementById("callSuccessModalBtn").click();
          history.push("/client/login");
        }
    });
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <FormGroup isRow={true}>
        <Label forId={"name"}>Enter your name</Label>
        <TextField id={"name"} name={"name"} />
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId={"email"}>Enter your email</Label>
        <EmailField id={"email"} />
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId={"password"}>Enter your password</Label>
        <PasswordField id={"password"} />
      </FormGroup>
      <Button isLoad={state.signUpIsLoad} value={"Sign Up"} />
    </form>
  );
}

RegistrationForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RegistrationForm;
