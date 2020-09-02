import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SERVERDOMAIN } from "../../services/serverUrls";
import { changeModalWarningDataAdmin } from "../../store/adminModalWindows/actions";

import {
  changeAdminLoginIsLoad,
  toogleAuthAdmin,
} from "../../store/auth/actions";

import LoginForm from "../../forms/LoginForm";

import Context from "../../ContextComponent";

function LoginPage(props) {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return { authIsLoad: state.authReducer.adminLoginIsLoad };
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const newObj = { email, password };

    if (!email.match(/^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,}$/)) {
      context.openWarningTooltip("Invalid email format!", e.target.email.id);
      return false;
    }
    if (password) {
      if (password.length < 4 || password.length > 16) {
        context.openWarningTooltip("Password must not be less than 4 characters and must not be longer than 16 characters!", e.target.password.id);
        return false;
      }
    }

    
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
          context.openErrorWindowWithMsg(data.msg);
        }
      });
  }
  return <LoginForm submitHandler={handler} authIsLoad={state.authIsLoad} />;
}

export default LoginPage;
