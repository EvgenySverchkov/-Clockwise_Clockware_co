import React from "react";
import { connect } from 'react-redux';

import { changeAuthIsLoad, toogleAuth } from "../../store/adminPanel/actions";
import { SERVERDOMAIN } from "../../services/serverUrls";

function LoginForm(props) {
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
          props.history.push("/admin");
          props.getAllData();
          props.toogleAuth(true);
        } else {
          alert(data.msg);
        }
      });
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <div className="form-group row text-center text-sm-left col-12 col-md-10 col-lg-8">
        <label
          htmlFor="login"
          className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold"
        >
          Enter your login
        </label>
        <div className="col-sm-8 col-md-8">
          <input
            id="login"
            type="text"
            name="login"
            className="form-control"
            required
          />
        </div>
      </div>
      <div className="form-group row text-center text-sm-left col-12 col-md-10 col-lg-8">
        <label
          htmlFor="password"
          className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold"
        >
          Enter your password
        </label>
        <div className="col-sm-8 col-md-8">
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            required
          />
        </div>
      </div>
      <div className="row justify-content-sm-center col-12">
        <input
          type="submit"
          value={props.authIsLoad ? "Loading..." : "Login"}
          className="btn btn-primary col-12 col-sm-4 mt-3"
        />
      </div>
    </form>
  );
}

function mapStateToProps(state){
  return {
    authIsLoad: state.main_adminPanel_reduser.authIsLoad
  }
}

const actions = {
  changeAuthIsLoad, 
  toogleAuth
};

export default connect(mapStateToProps, actions)(LoginForm);
