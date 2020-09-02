import React, { useContext } from "react";
import PropTypes from "prop-types";

import FormGroup from "../components/FormComponents/FormGroup";
import Button from "../components/FormComponents/Button";
import TimeField from "../components/FormComponents/TimeField";
import DateField from "../components/FormComponents/DateField";

import TextFieldWithLabel from "../components/CompleteFormFields/TextFieldWithLabel";
import ChooseClockSizeField from "../components/CompleteFormFields/ChooseClockSizeField";
import ChooseTownsField from "../components/CompleteFormFields/ChooseTownField";

import Context from "../ContextComponent";

function OrderForm({
  submitHandler,
  changeHandler,
  currentOrder,
  isLoadOrderForm,
  townsArr = [],
  townsInOrderFormIsLoad,
}) {
  const context = useContext(Context);
  function minDate() {
    let date = new Date();
    return `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  }
  function maxDate(minDate) {
    let date = new Date(minDate);
    date.setFullYear(date.getFullYear() + 1);
    return `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  }

  const currDate = minDate();
  return (
    <form onSubmit={submitHandler} onBlur={()=>context.closeWrningTooltip()} className="mt-4 row justify-content-center">
      <TextFieldWithLabel
        fieldName={"name"}
        changeHandler={changeHandler}
        value={currentOrder.name || ""}
      />
      <TextFieldWithLabel
        fieldName={"email"}
        changeHandler={changeHandler}
        value={currentOrder.email || ""}
      />
      <ChooseClockSizeField changeHandler={changeHandler} />
      <ChooseTownsField
        changeHandler={changeHandler}
        isLoad={townsInOrderFormIsLoad}
        townsArr={townsArr}
      />
      <FormGroup isRow={false}>
        <div className="mb-2 font-weight-bold">
          Choose date and time
          <br />
          <sub>*time from 8 to 18</sub>
        </div>
        <DateField
          name={"date"}
          min={currDate}
          max={maxDate(currDate)}
          chngHandler={changeHandler}
          value={currentOrder.date || ""}
        />
        <TimeField
          name={"time"}
          chngHandler={changeHandler}
          value={currentOrder.time || ""}
        />
      </FormGroup>
      <Button loading={isLoadOrderForm} value={"Next step"} />
    </form>
  );
}

OrderForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  currentOrder: PropTypes.object.isRequired,
  isLoadOrderForm: PropTypes.bool.isRequired,
  townsArr: PropTypes.array.isRequired,
};

export default OrderForm;
