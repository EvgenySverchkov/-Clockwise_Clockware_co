import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  changeAddMewOrderFormIsLoad,
  addNewTown,
} from "../../store/adminPanel/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

import OrderForm from "../OrderForm";

function OrderFormAdmin(props) {
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
    props.changeAddMewOrderFormIsLoad(true);
  }
  return (
    <OrderForm
      submitHandler={submitHandler}
      orderFormIsLoad={props.newOrderFormIsLoad}
      townsArr={props.townsArr}
    />
  );
}
function mapStateToProps(state) {
  return {
    newOrderFormIsLoad: state.main_adminPanel_reduser.newOrderFormIsLoad,
    townsArr: state.town_reduser.towns,
  };
}

const actions = {
  changeAddMewOrderFormIsLoad,
};

OrderForm.propTypes = {
  currentOrder: PropTypes.object,
  submitHandler: PropTypes.func,
  townsArr: PropTypes.array,
  addCurrentOrderToState: PropTypes.func,
};

export default connect(mapStateToProps, actions)(OrderFormAdmin);
