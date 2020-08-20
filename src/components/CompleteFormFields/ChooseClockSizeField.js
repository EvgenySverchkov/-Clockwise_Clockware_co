import React from "react";

import RadioBtn from "../FormComponents/RadioBtn";
import Label from "../FormComponents/Label";
import FormGroup from "../FormComponents/FormGroup";

const ChooseClockSizeField = ({ changeHandler }) => (
  <FormGroup isRow={false}>
    <div className="mb-2 font-weight-bold">Choose size of clock</div>
    <RadioBtn
      id={"smallSize"}
      value={"small"}
      name={"size"}
      chngHandler={changeHandler}
    >
      <Label forId={"smallSize"} isFontWeight={false}>
        Small
      </Label>
    </RadioBtn>
    <RadioBtn
      id={"middleSize"}
      value={"middle"}
      name={"size"}
      chngHandler={changeHandler}
    >
      <Label forId={"middleSize"} isFontWeight={false}>
        Middle
      </Label>
    </RadioBtn>
    <RadioBtn
      id={"largeSize"}
      value={"large"}
      name={"size"}
      chngHandler={changeHandler}
    >
      <Label forId={"largeSize"} isFontWeight={false}>
        Large
      </Label>
    </RadioBtn>
  </FormGroup>
);

export default ChooseClockSizeField;
