import React from "react";

import FormGroup from "../components/FormComponents/FormGroup";
import Label from "../components/FormComponents/Label";
import TextField from "../components/FormComponents/TextField";
import PasswordField from "../components/FormComponents/PasswordField";
import Button from "../components/FormComponents/Button";

const LoginForm = ({ submitHandler, authIsLoad }) => (
  <form onSubmit={submitHandler} className="mt-4 row justify-content-center">
    <FormGroup>
      <Label forId="email">Enter your email</Label>
      <TextField id={"email"} name={"email"} />
    </FormGroup>
    <FormGroup>
      <Label forId="password">Enter your password</Label>
      <PasswordField id={"password"} />
    </FormGroup>
    <Button isLoad={authIsLoad} value={"Login"} />
  </form>
);

export default LoginForm;
