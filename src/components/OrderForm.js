import React from "react";

import FormGroup from "./FormComponents/FormGroup";
import Label from "./FormComponents/Label";
import Button from "./FormComponents/Button";
import TextFiled from "./FormComponents/TextField";
import EmailField from "./FormComponents/EmailField";
import RadioBtn from "./FormComponents/RadioBtn";
import TimeField from "./FormComponents/TimeField";
import DateField from "./FormComponents/DateField";

function OrderForm({
  submitHandler,
  changeHandler,
  currentOrder,
  isLoadOrderForm,
  townsArr,
}) {
  function minDate() {
    let date = new Date();
    return `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  }
  return (
    <form onSubmit={submitHandler} className="mt-4 row justify-content-center">
      <FormGroup isRow={true}>
        <Label forId="name">Enter your name</Label>
        <TextFiled id={"name"} name={"name"} chngHandler={changeHandler} value={currentOrder.name || ""} />
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId="email">Enter your e-mail</Label>
        <EmailField id={"email"} name={"email"} chngHandler={changeHandler} value={currentOrder.email || ""}/>
      </FormGroup>
      <FormGroup isRow={false}>
        <div className="mb-2 font-weight-bold">Choose size of clock</div>
        <RadioBtn id={"smallSize"} value={"small"} name={"size"} chngHandler={changeHandler}>
          <Label forId={"smallSize"} isFontWeight={false}>Small</Label>
        </RadioBtn>
        <RadioBtn id={"middleSize"} value={"middle"} name={"size"} chngHandler={changeHandler}>
          <Label forId={"middleSize"} isFontWeight={false}>Middle</Label>
        </RadioBtn>
        <RadioBtn id={"largeSize"} value={"large"} name={"size"} chngHandler={changeHandler}>
          <Label forId={"largeSize"} isFontWeight={false}>Middle</Label>
        </RadioBtn>
      </FormGroup>
      <FormGroup isRow={false}>
        <div className="mb-2 font-weight-bold">Choose town</div>
        {townsArr.map((item) => (
          <div key={item.id + 1} className="form-check-inline">
            <RadioBtn id={item.name} value={item.name} name={"town"} chngHandler={changeHandler}>
              <Label forId={item.name} isFontWeight={false}>{item.name}</Label>
            </RadioBtn>
          </div>
        ))}
      </FormGroup>
      <FormGroup isRow={false}>
        <div className="mb-2 font-weight-bold">
          Choose date and time
          <br />
          <sub>*time from 8 to 18</sub>
        </div>
        <DateField name={"date"} min={minDate()} chngHandler={changeHandler} value={currentOrder.date || ""}/>
        <TimeField name={"time"} max={"18:00"} min={"08:00"} chngHandler={changeHandler} value={currentOrder.time || ""}/>
      </FormGroup>
      <Button isLoad={isLoadOrderForm} value={"Next step"} />
    </form>
  );
}

export default OrderForm;
