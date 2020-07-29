import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  initMasters,
  deleteMasterFromState,
  townsInit,
} from "../../../store/adminPanel/actions";
import deleteDataFromServer from "../services/deleteDataFromServer";
import List from "../List";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const MastersList = ({
  mastersArr,
  deleteMasterFromState,
  initMasters,
  townsInit,
  history,
}) => {
  function getMastersAndTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/masters`, { headers })
      .then((data) => data.json())
      .then((data) => initMasters(data))
      .catch((err) => {
        alert("Please, authorise");
        initMasters([]);
      });
    getTownsFromServerToState();
  }
  function getTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => townsInit(data));
  }
  function deleteMasterById(masterId) {
    deleteDataFromServer(`${SERVERDOMAIN}/masters/delete/${masterId}`)
      .then((data) => {
        if (data.success) {
          deleteMasterFromState(data.payload);
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <List
      dataArr={mastersArr}
      deleteAction={deleteMasterById}
      mainRows={["name", "rating"]}
      getData={getMastersAndTownsFromServerToState}
      history={history}
    />
  );
};

const actions = {
  initMasters,
  deleteMasterFromState,
  townsInit,
};

const mapStateToProps = (state) => {
  return {
    mastersArr: state.master_reducer.masters,
  };
};

MastersList.propTypes = {
  mastersArr: PropTypes.array.isRequired,
  deleteMasterFromState: PropTypes.func.isRequired,
  initMasters: PropTypes.func.isRequired,
  townsInit: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default connect(mapStateToProps, actions)(MastersList);
