import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { SERVERDOMAIN } from "../../services/serverUrls";
import {
  changeLoginIsLoad,
  addCurrentOrderToState,
  toggleAuth,
} from "../../store/clientSide/actions";

import LoginForm from "../../forms/LoginForm";

function LoginPage({history}) {
  const state = useSelector(state=>{
    return {loginIsLoad: state.client_order_reduser.loginIsLoad}
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    let login = e.target.login.value;
    let password = e.target.password.value;
    let newObj = { login: login, password: password };

    dispatch(changeLoginIsLoad(true));
    fetch(`${SERVERDOMAIN}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch(changeLoginIsLoad(false));
        if (!data.success) {
          alert(data.msg);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(addCurrentOrderToState({ email: data.user.email }));
          dispatch(toggleAuth(true));
          history.push("/client");
        }
      });
  }
  return (
    <LoginForm submitHandler={handler} authIsLoad={state.loginIsLoad} />
  );
}

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default LoginPage;
