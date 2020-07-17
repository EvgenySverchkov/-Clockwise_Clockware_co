import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  changeMasterListIsLoad,
  addOrdersToState,
  addCurrentOrderToState,
} from "../../store/clientSide/actions";

import { Link } from "react-router-dom";
import { SERVERDOMAIN } from "../../services/serverUrls";
function MastersList(props) {
  function submitHandler(e) {
    e.preventDefault();
    let masterId = e.target.chooseMaster.value;
    if (!masterId) {
      alert("Please, choose one!!!");
      return false;
    }
    let endOrderTime;
    let clientTimeHour = +props.currentOrder.time.match(/[^:]+/);
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
    let newObj = {
      ...props.currentOrder,
      masterId: masterId,
      endTime: endOrderTime,
    };

    props.changeMasterListIsLoad(true);
    fetch(`${SERVERDOMAIN}/ordersClient/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((json) => json.json())
      .then((data) => {
        props.changeMasterListIsLoad(false);
        if (data.success) {
          alert(data.msg);
          props.history.push("/");
          sendConfirmEmail(data);
          props.addCurrentOrderToState(
            props.isAuth
              ? {
                  email: JSON.parse(localStorage.getItem("user")).email,
                }
              : {}
          );
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  function sendConfirmEmail(data) {
    fetch(`${SERVERDOMAIN}/send_message`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }

  if (props.suitableMasters.length === 0) {
    return (
      <>
        <div className="text-left display-4">
          We haven't masters in this city
        </div>
        <Link to="/client" className="btn btn-primary mt-5">
          Сome back
        </Link>
      </>
    );
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="row">
        {props.suitableMasters.map((item) => {
          return (
            <div className="col-sm-4 mb-2 col-sm-6 col-lg-4" key={item.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Rating: {item.rating}</p>
                  <p className="card-text">Towns: {item.towns}</p>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="chooseMaster"
                      id={item.id}
                      value={item.id}
                    />
                    <label className="form-check-label" htmlFor={item.id}>
                      Choose
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="form-group float-left mt-3">
        <Link to="/client" className="btn btn-primary">
          Сome back
        </Link>
      </div>
      <div className="form-group float-right mt-3">
        <input
          type="submit"
          value={props.masterListIsLoad ? "Loading..." : "Book now"}
          className="btn btn-primary"
        />
      </div>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    suitableMasters: state.client_order_reduser.suitableMasters,
    currentOrder: state.client_order_reduser.currentOrder,
    masterListIsLoad: state.client_order_reduser.masterListIsLoad,
    ordersArr: state.client_order_reduser.ordersArr,
  };
}
const actions = {
  changeMasterListIsLoad,
  addOrdersToState,
  addCurrentOrderToState,
};
MastersList.propTypes = {
  mastersArr: PropTypes.array,
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
};

export default connect(mapStateToProps, actions)(MastersList);
