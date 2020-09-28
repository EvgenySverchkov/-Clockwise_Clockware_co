import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { addCurrentOrderToState } from "../../store/orders/actions";
import { changeClientLoginIsLoad } from "../../store/auth/actions";
import { toogleAuthClient } from "../../store/auth/actions";

import LoginForm from "../../forms/LoginForm";
import Context from "../../ContextComponent";

import { SERVERDOMAIN } from "../../services/serverUrls";

function LoginPage({ history }) {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return { loginIsLoad: state.authReducer.clientLoginIsLoad };
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    let trgetElem = e.target;
    let email = trgetElem.email;
    let password = trgetElem.password;
    let newObj = { email: email.value, password: password.value };

    if (!email.value.match(/^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,}$/)) {
      context.openWarningTooltip("Invalid email format!", email.id);
      return false;
    }
    if (password) {
      if (password.value.length < 4 || password.value.length > 16) {
        context.openWarningTooltip(
          "Password must not be less than 4 characters and must not be longer than 16 characters!",
          password.id
        );
        return false;
      }
    }
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
          context.openErrorWindowWithMsg(data.msg);
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
