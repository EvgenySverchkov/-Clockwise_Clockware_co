import React from "react";

import FormGroup from "./FormComponents/FormGroup";
import Label from "./FormComponents/Label";
import TextField from "./FormComponents/TextField";
import PasswordField from "./FormComponents/PasswordField";
import Button from "./FormComponents/Button";

const LoginForm = ({ submitHandler, authIsLoad }) => (
  <form onSubmit={submitHandler} className="mt-4 row justify-content-center">
    <FormGroup>
      <Label forId="login">Enter your login</Label>
      <TextField id={"login"} name={"login"} />
    </FormGroup>
    <FormGroup>
      <Label forId="password">Enter your password</Label>
      <PasswordField id={"password"} />
    </FormGroup>
    <Button isLoad={authIsLoad} value={"Login"} />
  </form>
);

export default LoginForm;
