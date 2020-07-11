import React from "react";

function LoginForm({ handler }) {
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
          value="Login"
          className="btn btn-primary col-12 col-sm-4 mt-3"
        />
      </div>
    </form>
  );
}

export default LoginForm;
