import React from "react";
import { connect } from 'react-redux';
import { changeLoginIsLoad, addCurrentOrderToState, toggleAuth } from "../../store/clientSide/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";
import FormGroup from "./FormComponents/FormGroup";
import Label from "./FormComponents/Label";
import TextField from "./FormComponents/TextField";
import PasswordField from "./FormComponents/PasswordField";
import SubmitButton from "./FormComponents/SubmitButton";

function LoginForm(props) {
  function handler(e) {
    e.preventDefault();
    let login = e.target.login.value;
    let password = e.target.password.value;
    let newObj = { login: login, password: password };
    
    props.changeLoginIsLoad(true);
    fetch(`${SERVERDOMAIN}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        props.changeLoginIsLoad(false);
        if (!data.success) {
          alert(data.msg);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          props.addCurrentOrderToState({ email: data.user.email });
          props.toggleAuth(true);
          props.history.push("/client");
        }
      });
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <FormGroup isRow={true}>
        <Label forId="login">Enter your login</Label>
        <TextField id={"login"} name={"login"}/>
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId="password">Enter your password</Label>
        <PasswordField id={'password'}/>
      </FormGroup>
      <SubmitButton isLoad = {props.loginIsLoad}/>
    </form>
  );
}

function mapStateToProps(state){
  return {
    loginIsLoad: state.client_order_reduser.loginIsLoad
  }
}
const actions = {
  changeLoginIsLoad,
  addCurrentOrderToState,
  toggleAuth
}
export default connect(mapStateToProps, actions)(LoginForm);
