import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SERVERDOMAIN } from "../../services/serverUrls";
import { changeAuthIsLoad, toogleAuth } from "../../store/adminPanel/services/actions";

import LoginForm from "../../forms/LoginForm";

function LoginPage(props) {
  const state = useSelector(state=>{
    return {authIsLoad: state.main_adminPanel_reduser.authIsLoad}
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    const login = e.target.login.value;
    const password = e.target.password.value;
    const newObj = { login, password };
    dispatch(changeAuthIsLoad(true));
    fetch(`${SERVERDOMAIN}/adminLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((json) => json.json())
      .then((data) => {
        dispatch(changeAuthIsLoad(false));
        if (data.success) {
          sessionStorage.setItem("token", data.token);
          props.history.push("/admin/ordersList");
          dispatch(toogleAuth(true));
        } else {
          alert(data.msg);
        }
      });
  }
  return (
    <LoginForm submitHandler={handler} authIsLoad={state.authIsLoad} />
  );
}

export default LoginPage;
