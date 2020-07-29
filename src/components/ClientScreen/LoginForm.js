import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { SERVERDOMAIN } from "../../services/serverUrls";
import {
  changeLoginIsLoad,
  addCurrentOrderToState,
  toggleAuth,
} from "../../store/clientSide/actions";

import LoginComponent from "../LoginComponent";

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
    <LoginComponent submitHandler={handler} authIsLoad={props.loginIsLoad} />
  );
}

LoginForm.propTypes = {
  loginIsLoad: PropTypes.bool,
  history: PropTypes.object,
  toggleAuth: PropTypes.func.isRequired,
  addCurrentOrderToState: PropTypes.func.isRequired,
  changeLoginIsLoad: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    loginIsLoad: state.client_order_reduser.loginIsLoad,
  };
}
const actions = {
  changeLoginIsLoad,
  addCurrentOrderToState,
  toggleAuth,
};

export default connect(mapStateToProps, actions)(LoginForm);
