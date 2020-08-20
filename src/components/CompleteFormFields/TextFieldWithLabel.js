import React from "react";

import FormGroup from "../FormComponents/FormGroup";
import Label from "../FormComponents/Label";
import TextField from "../FormComponents/TextField";

const TextFieldWithLabel = ({ fieldName, changeHandler, value }) => (
  <FormGroup key={fieldName} isRow={true}>
    <Label forId={fieldName}>Enter {fieldName}</Label>
    <TextField
      id={fieldName}
      name={fieldName}
      value={value || ""}
      chngHandler={changeHandler}
    />
  </FormGroup>
);

export default TextFieldWithLabel;
