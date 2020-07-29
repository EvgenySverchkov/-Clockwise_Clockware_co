import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  changeEditFormIsLoad,
  updateOrderInState,
} from "../../../store/adminPanel/actions";
import putDataToServer from "../services/putDataToServer";

import EditForm from "../EditForm";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const EditOrderForm = ({
  match,
  history,
  ordersArr,
  changeEditFormIsLoad,
  updateOrderInState,
}) => {
  function editOrderHandler(e, newOrderObj) {
    e.preventDefault();
    changeEditFormIsLoad(true);
    putDataToServer(`${SERVERDOMAIN}/orders/put/${newOrderObj.id}`, newOrderObj)
      .then((data) => {
        changeEditFormIsLoad(false);
        if (data.success) {
          alert(data.msg);
          updateOrderInState(data);
          history.push("/admin/ordersList");
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <EditForm
      id={+match.params.id}
      handler={editOrderHandler}
      arrFromState={ordersArr}
    />
  );
};

EditOrderForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  ordersArr: PropTypes.array.isRequired,
  changeEditFormIsLoad: PropTypes.func.isRequired,
  updateOrderInState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ordersArr: state.orders_reducer.ordersArr,
  };
};

const actions = {
  changeEditFormIsLoad,
  updateOrderInState,
};

export default connect(mapStateToProps, actions)(EditOrderForm);
