import React from "react";
import { connect } from "react-redux";

import { SERVERDOMAIN } from "../../services/serverUrls";
import { changeAuthIsLoad, toogleAuth } from "../../store/adminPanel/actions";

import LoginComponent from "../LoginComponent";

function AuthForm(props) {
  function handler(e) {
    e.preventDefault();
    const login = e.target.login.value;
    const password = e.target.password.value;
    const newObj = { login, password };
    props.changeAuthIsLoad(true);
    fetch(`${SERVERDOMAIN}/adminLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((json) => json.json())
      .then((data) => {
        props.changeAuthIsLoad(false);
        if (data.success) {
          sessionStorage.setItem("token", data.token);
          props.history.push("/admin/ordersList");
          props.toogleAuth(true);
        } else {
          alert(data.msg);
        }
      });
  }
  return (
    <LoginComponent submitHandler={handler} authIsLoad={props.authIsLoad} />
  );
}

function mapStateToProps(state) {
  return {
    authIsLoad: state.main_adminPanel_reduser.authIsLoad,
  };
}

const actions = {
  changeAuthIsLoad,
  toogleAuth,
};

export default connect(mapStateToProps, actions)(AuthForm);
