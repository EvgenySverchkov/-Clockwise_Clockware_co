import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addCurrentOrderToState, changeOrderFormIsLoad, addSuitableMasters } from "../../store/clientSide/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

function OrderForm(props) {
  function changeHandler(e) {
    let idx = e.target.name;
    props.addCurrentOrderToState({ ...props.currentOrder, [idx]: e.target.value });
  }
  function minDate() {
    let date = new Date();
    return `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  }
  function submitHandler(e) {
    e.preventDefault();
    let trgElem = e.target;
    if (!trgElem.town.value || !trgElem.size.value) {
      alert("Pleade, filling all gaps!!!");
      return false;
    }
    let endOrderTime;
    let clientTimeHour = +props.currentOrder.time.match(/\d\d/);
    let clientTimeMin = props.currentOrder.time.match(/:\d\d$/);
    switch (props.currentOrder.size) {
      case "small":
        endOrderTime = clientTimeHour + 1 + clientTimeMin;
        break;
      case "middle":
        endOrderTime = clientTimeHour + 2 + clientTimeMin;
        break;
      case "large":
        endOrderTime = clientTimeHour + 3 + clientTimeMin;
        break;
      default:
        endOrderTime = 0;
    }
    props.changeOrderFormIsLoad(true);
    getFreeMastersByClientTownFromServer(
      SERVERDOMAIN,
      e.target.town.value,
      props.currentOrder.time,
      endOrderTime,
      props.currentOrder.date
    ).then((data) => {
      props.changeOrderFormIsLoad(false);
      props.addSuitableMasters(data);
      props.history.push("/client/masters");
    });
  }
  function getFreeMastersByClientTownFromServer(
    url,
    clientTown,
    clientTimeStart,
    clientTimeEnd,
    clientDate
  ) {
    let obj = {
      town: clientTown,
      timeStart: clientTimeStart,
      timeEnd: clientTimeEnd,
      date: clientDate,
    };
    return fetch(`${url}/freeMasters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj)
    }).then((json) =>
      json.json()
    );
  }
  return (
    <>
      <div className="text-center mb-1">
        You are welcomed by <h1 className="font-italic">Clockwise company</h1>
      </div>
      <br />
      <div className="text-center">Fill out this form to order a master</div>
      <form
        onSubmit={submitHandler}
        className="mt-4 row justify-content-center"
      >
        <div className="form-group row text-center text-sm-left col-12 col-md-10 col-lg-8">
          <label
            htmlFor="name"
            className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold"
          >
            Enter your name
          </label>
          <div className="col-sm-8 col-md-8">
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              onChange={changeHandler}
              value={props.currentOrder.name || ""}
              required
            />
          </div>
        </div>
        <div className="form-group row text-center text-sm-left col-12 col-md-10 col-lg-8">
          <label
            htmlFor="email"
            className="pl-0 pr-0 col-sm-4 col-md-4 col-form-label font-weight-bold"
          >
            Enter your e-mail
          </label>
          <div className="col-sm-8 col-md-8">
            <input
              id="email"
              type="email"
              name="email"
              className="form-control"
              onChange={changeHandler}
              value={props.currentOrder.email || ""}
              required
            />
          </div>
        </div>
        <div className="form-group text-center text-sm-left col-12 col-md-10 col-lg-8">
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
        </div>
        <div className="form-group text-center text-sm-left col-12 col-md-10 col-lg-8">
          <div className="mb-2 font-weight-bold">Choose town</div>
          {props.townsArr.map((item) => (
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
        </div>
        <div className="form-group text-center text-sm-left col-12 col-md-10 col-lg-8">
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
            value={props.currentOrder.date || ""}
            required
          />
          <input
            type="time"
            name="time"
            max="18:00"
            min="08:00"
            onChange={changeHandler}
            value={props.currentOrder.time || ""}
            required
          />
        </div>
        <div className="row justify-content-sm-center col-12">
          <input
            type="submit"
            value={props.orderFormIsLoad ? "Loading..." : "Next step" }
            className="btn btn-primary col-12 col-sm-4 mt-3"
          />
        </div>
      </form>
    </>
  );
}
function mapStateToProps(state) {
  return {
    currentOrder: state.client_order_reduser.currentOrder,
    orderFormIsLoad: state.client_order_reduser.orderFormIsLoad,
    townsArr: state.client_order_reduser.townsArr,
  };
}

const actions = {
  addCurrentOrderToState,
  changeOrderFormIsLoad,
  addSuitableMasters
}

OrderForm.propTypes = {
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
  townsArr: PropTypes.array,
  addCurrentOrderToState: PropTypes.func,
};

export default connect(mapStateToProps, actions)(OrderForm);
