import React from "react";
import FormGroup from "./FormComponents/FormGroup";
import Label from "./FormComponents/Label";
import Button from "./FormComponents/Button";

function OrderForm({
  submitHandler,
  changeHandler,
  currentOrder,
  orderFormIsLoad,
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
        <div className="col-sm-8 col-md-8">
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            onChange={changeHandler}
            value={currentOrder.name || ""}
          />
        </div>
      </FormGroup>
      <FormGroup isRow={true}>
        <Label forId="email">Enter your e-mail</Label>
        <div className="col-sm-8 col-md-8">
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            onChange={changeHandler}
            value={currentOrder.email || ""}
            required
          />
        </div>
      </FormGroup>
      <FormGroup isRow={false}>
        <div className="mb-2 font-weight-bold">Choose size of clock</div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            onChange={changeHandler}
            name="size"
            id="smallSize"
            value="small"
          />
          <label className="form-check-label" htmlFor="smallSize">
            Small
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            onChange={changeHandler}
            name="size"
            id="middleSize"
            value="middle"
          />
          <label className="form-check-label" htmlFor="middleSize">
            Middle
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            onChange={changeHandler}
            name="size"
            id="largeSize"
            value="large"
          />
          <label className="form-check-label" htmlFor="largeSize">
            Large
          </label>
        </div>
      </FormGroup>
      <FormGroup isRow={false}>
        <div className="mb-2 font-weight-bold">Choose town</div>
        {townsArr.map((item) => (
          <div key={item.id + 1} className="form-check-inline">
            <label className="form-check-label" htmlFor={item.name}>
              <input
                type="radio"
                className="form-check-input"
                onChange={changeHandler}
                name="town"
                id={item.name}
                value={item.name}
              />
              {item.name}
            </label>
          </div>
        ))}
      </FormGroup>
      <FormGroup isRow={false}>
        <div className="mb-2 font-weight-bold">
          Choose date and time
          <br />
          <sub>*time from 8 to 18</sub>
        </div>
        <input
          type="date"
          name="date"
          min={minDate()}
          className="mr-1"
          onChange={changeHandler}
          value={currentOrder.date || ""}
          required
        />
        <input
          type="time"
          name="time"
          max="18:00"
          min="08:00"
          onChange={changeHandler}
          value={currentOrder.time || ""}
          required
        />
      </FormGroup>
      <Button isLoad={orderFormIsLoad} value={"Next step"} />
    </form>
  );
}

export default OrderForm;
