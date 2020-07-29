import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeSignUpIsLoad } from "../../store/clientSide/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import FormGroup from "../FormComponents/FormGroup";
import Label from "../FormComponents/Label";
import TextField from "../FormComponents/TextField";
import EmailField from "../FormComponents/EmailField";
import PasswordField from "../FormComponents/PasswordField";
import Button from "../FormComponents/Button";

function RegistrationForm(props) {
  function handler(e) {
    e.preventDefault();
    const elem = e.target;
    let newObj = {
      name: elem.name.value,
      login: elem.login.value,
      email: elem.email.value,
      password: elem.password.value,
    };
    props.changeSignUpIsLoad(true);
    fetch(`${SERVERDOMAIN}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        props.changeSignUpIsLoad(false);
        if (!data.success) {
          alert(data.msg);
        } else {
          alert(`Congratulations! ${data.user.name} you are signUp`);
          props.history.push("/client/login");
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
        <Label forId={"login"}>Enter your login</Label>
        <TextField id={"login"} name={"login"} />
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId={"email"}>Enter your email</Label>
        <EmailField id={"email"} />
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId={"password"}>Enter your password</Label>
        <PasswordField id={"password"} />
      </FormGroup>
      <Button isLoad={props.signUpIsLoad} value={"Sign Up"} />
    </form>
  );
}

RegistrationForm.propTypes = {
  signUpIsLoad: PropTypes.bool,
  history: PropTypes.object.isRequired,
  changeSignUpIsLoad: PropTypes.func,
};

function mapStateToPorps(state) {
  return {
    signUpIsLoad: state.client_order_reduser.signUpIsLoad,
  };
}
const actions = {
  changeSignUpIsLoad,
};
export default connect(mapStateToPorps, actions)(RegistrationForm);
