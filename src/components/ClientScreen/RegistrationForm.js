import React from "react";
import {connect} from "react-redux";
import {changeSignUpIsLoad} from "../../store/clientSide/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

function RegistrationForm(props) {
  function handler(e) {
    e.preventDefault();
    const elem = e.target;
    let newObj = {
      name: elem.name.value,
      login: elem.login.value,
      email: elem.email.value,
      password: elem.password.value,
    };
    props.changeSignUpIsLoad(true);
    fetch(`${SERVERDOMAIN}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        props.changeSignUpIsLoad(false);
        if (!data.success) {
          alert(data.msg);
        } else {
          alert(`Congratulations! ${data.user.name} you are signUp`);
          props.history.push("/client/login");
        }
      });
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <div className="form-group row text-center text-sm-left col-12 col-md-10 col-lg-8">
        <label
          htmlFor="name"
          className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold"
        >
          Enter your name
        </label>
        <div className="col-sm-8 col-md-8">
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            required
          />
        </div>
      </div>
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
          htmlFor="email"
          className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold"
        >
          Enter your email
        </label>
        <div className="col-sm-8 col-md-8">
          <input
            id="email"
            type="email"
            name="email"
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
          value={props.signUpIsLoad ? "Loading..." : "Sign up"}
          className="btn btn-primary col-12 col-sm-4 mt-3"
        />
      </div>
    </form>
  );
}

function mapStateToPorps(state){
  return {
    signUpIsLoad: state.client_order_reduser.signUpIsLoad,
  }
}
const actions = {
  changeSignUpIsLoad
}
export default connect(mapStateToPorps, actions)(RegistrationForm);
