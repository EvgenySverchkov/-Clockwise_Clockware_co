import React from "react";

import RadioBtn from "../FormComponents/RadioBtn";
import Label from "../FormComponents/Label";
import FormGroup from "../FormComponents/FormGroup";

const ChooseTownsField = ({ changeHandler, isLoad, townsArr }) => (
  <FormGroup isRow={false}>
    <div className="mb-2 font-weight-bold">Choose town</div>
    {
      isLoad
      ? "Loading..."
      : (
        townsArr.length === 0 ? "-- List is empty --"
        : (
          townsArr.map((item) => (
            <div key={item.id + 1} className="form-check-inline">
              <RadioBtn
                id={item.name}
                value={item.name}
                name={"town"}
                chngHandler={changeHandler}
              >
                <Label forId={item.name} isFontWeight={false}>
                  {item.name}
                </Label>
              </RadioBtn>
            </div>
          ))
        )
      )
      }
  </FormGroup>
);

export default ChooseTownsField;
