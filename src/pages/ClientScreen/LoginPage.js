import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { SERVERDOMAIN } from "../../services/serverUrls";

import { addCurrentOrderToState } from "../../store/orders/actions";
import { changeWarningModalData } from "../../store/clientModalWindows/actions";

import { changeClientLoginIsLoad } from "../../store/auth/actions";

import { toogleAuthClient } from "../../store/auth/actions";

import LoginForm from "../../forms/LoginForm";

function LoginPage({ history }) {
  const state = useSelector((state) => {
    return { loginIsLoad: state.authReducer.clientLoginIsLoad };
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let newObj = { email: email, password: password };

    dispatch(changeClientLoginIsLoad(true));
    fetch(`${SERVERDOMAIN}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch(changeClientLoginIsLoad(false));
        if (!data.success) {
          dispatch(
            changeWarningModalData({
              msg: data.msg,
            })
          );
          document.getElementById("callWarningModalBtn").click();
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(addCurrentOrderToState({ email: data.user.email }));
          dispatch(toogleAuthClient(true));
          history.push("/client");
        }
      });
  }
  return <LoginForm submitHandler={handler} authIsLoad={state.loginIsLoad} />;
}

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default LoginPage;
