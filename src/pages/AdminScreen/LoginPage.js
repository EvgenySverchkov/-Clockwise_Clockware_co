import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SERVERDOMAIN } from "../../services/serverUrls";
import { changeAuthIsLoad, toogleAuth, changeModalWarningDataAdmin } from "../../store/adminPanel/services/actions";


import LoginForm from "../../forms/LoginForm";

function LoginPage(props) {
  const state = useSelector(state=>{
    return {authIsLoad: state.main_adminPanel_reduser.authIsLoad}
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const newObj = { email, password };
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
          dispatch(changeModalWarningDataAdmin({msg: data.msg}))
          document.getElementById("callWarningModalBtn").click();
        }
      });
  }
  return (
    <LoginForm submitHandler={handler} authIsLoad={state.authIsLoad} />
  );
}

export default LoginPage;
