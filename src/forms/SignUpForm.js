import React, { useContext } from "react";
import authSelector from "../store/auth/selector";

import FormGroup from "../components/FormComponents/FormGroup";
import Label from "../components/FormComponents/Label";
import TextField from "../components/FormComponents/TextField";
import EmailField from "../components/FormComponents/EmailField";
import PasswordField from "../components/FormComponents/PasswordField";
import Button from "../components/FormComponents/Button";

import Context from "../ContextComponent";

const SignUpForm = ({ handler }) => {
  const context = useContext(Context);
  return (
    <form
      onSubmit={handler}
      onBlur={() => context.closeWrningTooltip()}
      className="mt-4 row justify-content-center"
    >
      <FormGroup isRow={true}>
        <Label forId={"name"}>Enter your name</Label>
        <TextField id={"name"} name={"name"} />
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId={"email"}>Enter your email</Label>
        <EmailField id={"email"} />
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId={"password"}>Enter your password</Label>
        <PasswordField id={"password"} />
      </FormGroup>
      <Button loading={authSelector().signUpIsLoad} value={"Sign Up"} />
    </form>
  );
};

export default SignUpForm;
