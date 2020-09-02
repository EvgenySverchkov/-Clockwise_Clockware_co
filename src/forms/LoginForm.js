import React, { useContext } from "react";

import FormGroup from "../components/FormComponents/FormGroup";
import Label from "../components/FormComponents/Label";
import EmailField from "../components/FormComponents/EmailField";
import PasswordField from "../components/FormComponents/PasswordField";
import Button from "../components/FormComponents/Button";

import Context from "../ContextComponent";

const LoginForm = ({ submitHandler, authIsLoad }) => {
  const context = useContext(Context)
  return (
    <form onSubmit={submitHandler} onBlur={()=>context.closeWrningTooltip()} className="mt-4 row justify-content-center">
      <FormGroup>
        <Label forId="email">Enter your email</Label>
        <EmailField id={"email"} />
      </FormGroup>
      <FormGroup>
        <Label forId="password">Enter your password</Label>
        <PasswordField id={"password"} />
      </FormGroup>
      <Button loading={authIsLoad} value={"Login"} />
    </form>
  );
}

export default LoginForm;
