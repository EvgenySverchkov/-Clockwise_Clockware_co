import React from "react";
import { connect } from 'react-redux';
import { changeLoginIsLoad, addCurrentOrderToState, toggleAuth } from "../../store/clientSide/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

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
          value={props.loginIsLoad ? "Loading..." : "Login"}
          className="btn btn-primary col-12 col-sm-4 mt-3"
        />
      </div>
    </form>
  );
}

function mapStateToProps(state){
  return {
    loginIsLoad: state.client_order_reduser.loginIsLoad
  }
}
const actions = {
  changeLoginIsLoad,
  addCurrentOrderToState,
  toggleAuth
}
export default connect(mapStateToProps, actions)(LoginForm);
