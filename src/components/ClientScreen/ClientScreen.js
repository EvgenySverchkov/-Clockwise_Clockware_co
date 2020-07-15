import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import {
  addCurrentOrderToState,
  addSuitableMasters,
  addOrdersToState,
  addNewOrderToState,
  toggleAuth,
  changeLoginIsLoad,
  changeSignUpIsLoad,
  changeOrderFormIsLoad,
  changeMasterListIsLoad,
  addTownsToState
} from "../../store/clientSide/actions";
import OrderForm from "./OrderForm";
import MastersList from "./MastersList";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import Header from "./Header";

import { SERVERDOMAIN } from "../../services/serverUrls";

function ClientSrcreen(props) {
  useEffect(() => {
    fetch(`${SERVERDOMAIN}/townsClient`)
      .then((json) => json.json())
      .then((data) => props.addTownsToState(data));
    getOrdersArrFromServer(SERVERDOMAIN).then((data) =>
      props.addOrdersToState(data)
    );
    if (localStorage.getItem("user")) {
      props.addCurrentOrderToState({
        email: JSON.parse(localStorage.getItem("user")).email,
      });
      props.toggleAuth(true);
    } else {
      props.toggleAuth(false);
    }
  }, []);
  function getOrdersArrFromServer(url) {
    return fetch(`${url}/ordersClient`).then((json) => json.json());
  }
  function createUniqueId(objectsArr) {
    if (objectsArr.length === 0) {
      return 1;
    }
    let idxsArr = objectsArr.map((item) => item.id);
    idxsArr.sort((a, b) => a - b);

    if (idxsArr.length === idxsArr[idxsArr.length - 1]) {
      return idxsArr.length + 1;
    } else {
      let resultLength = idxsArr[idxsArr.length - 1] + 1;
      for (let i = 1; i < resultLength; i++) {
        if (idxsArr.indexOf(i) === -1) {
          return i;
        }
      }
    }
  }
  function submitHandlerInListMasters(e) {
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
      id: createUniqueId(props.ordersArr),
      endTime: endOrderTime,
    };

    props.changeMasterListIsLoad(true);
    fetch(`${SERVERDOMAIN}/ordersClient/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .catch((err) => {
        throw err;
      })
      .then((json) => json.json())
      .then((data) => {
        props.changeMasterListIsLoad(false);
        alert("Congratulations, you have booked a master!!!");
        props.history.push("/");
        getOrdersArrFromServer(SERVERDOMAIN).then((data) =>
          props.addOrdersToState(data)
        );
        sendConfirmEmail(data);
        props.addCurrentOrderToState({
          email: JSON.parse(localStorage.getItem("user")).email,
        });
      })
      .catch((err) => alert(err));
  }
  function submitOrderFormHandler(e) {
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
  function sendConfirmEmail(data) {
    fetch(`${SERVERDOMAIN}/send_message`, {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  }
  function loginHangler(e) {
    e.preventDefault();
    let login = e.target.login.value;
    let password = e.target.password.value;
    let newObj = { login: login, password: password };
    
    props.changeLoginIsLoad(true);
    fetch(`${SERVERDOMAIN}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        props.changeLoginIsLoad(false);
        if (!data.success) {
          alert(data.msg);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          props.addCurrentOrderToState({ email: data.user.email });
          props.toggleAuth(true);
          props.history.push("/client");
        }
      });
  }
  function regHangler(e) {
    e.preventDefault();
    const elem = e.target;
    let newObj = {
      name: elem.name.value,
      login: elem.login.value,
      email: elem.email.value,
      password: elem.password.value,
    };
    props.changeSignUpIsLoad(true);
    fetch(`${SERVERDOMAIN}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        props.changeSignUpIsLoad(false);
        if (!data.success) {
          alert(data.msg);
        } else {
          alert(`Congratulations! ${data.user.name} you are signUp`);
          props.history.push("/client/login");
        }
      });
  }
  function logOutHandl() {
    ["user", "token"].forEach((item) => localStorage.removeItem(item));
    props.addCurrentOrderToState({ ...props.currentOrder, email: "" });
    props.toggleAuth(false);
  }

  return (
    <>
      <Header />
      <div className="col-md-8 mt-4 container">
        <Switch>
          <Route
            exact
            path="/client"
            render={() => (
              <OrderForm
                townsArr={props.townsArr}
                submitHandler={submitOrderFormHandler}
              />
            )}
          />
          <Route
            path="/client/masters"
            render={() => (
              <MastersList submitHandler={submitHandlerInListMasters} />
            )}
          />
          <Route
            path="/client/login"
            render={() => <LoginForm handler={loginHangler} />}
          />
          <Route
            path="/client/registration"
            render={() =><RegistrationForm handler={regHangler} />}
          />
        </Switch>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    currentOrder: state.client_order_reduser.currentOrder,
    ordersArr: state.client_order_reduser.ordersArr,
    bookedMasters: state.client_order_reduser.bookedMasters,
    isAuth: state.client_order_reduser.isAuth,
    townsArr: state.client_order_reduser.townsArr,
  };
}
let actions = {
  addOrdersToState,
  addCurrentOrderToState,
  addSuitableMasters,
  addNewOrderToState,
  toggleAuth,
  changeLoginIsLoad,
  changeSignUpIsLoad,
  changeOrderFormIsLoad,
  changeMasterListIsLoad,
  addTownsToState
};

ClientSrcreen.propTypes = {
  addOrdersToState: PropTypes.func,
  addCurrentOrderToState: PropTypes.func,
  addSuitableMasters: PropTypes.func,
  addNewOrderToState: PropTypes.func,
  currentOrder: PropTypes.object,
  ordersArr: PropTypes.array,
};

export default connect(mapStateToProps, actions)(ClientSrcreen);
