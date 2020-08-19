import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SERVERDOMAIN } from "../../services/serverUrls";
import {
  changeModalWarningDataAdmin,
} from "../../store/adminModalWindows/actions";

import { changeAdminLoginIsLoad, toogleAuthAdmin } from "../../store/auth/actions";

import LoginForm from "../../forms/LoginForm";

function LoginPage(props) {
  const state = useSelector((state) => {
    return { authIsLoad: state.authReducer.adminLoginIsLoad };
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const newObj = { email, password };
    dispatch(changeAdminLoginIsLoad(true));
    fetch(`${SERVERDOMAIN}/adminLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((json) => json.json())
      .then((data) => {
        dispatch(changeAdminLoginIsLoad(false));
        if (data.success) {
          sessionStorage.setItem("token", data.token);
          props.history.push("/admin/ordersList");
          dispatch(toogleAuthAdmin(true));
        } else {
          dispatch(changeModalWarningDataAdmin({ msg: data.msg }));
          document.getElementById("callWarningModalBtn").click();
        }
      });
  }
  return <LoginForm submitHandler={handler} authIsLoad={state.authIsLoad} />;
}

export default LoginPage;
