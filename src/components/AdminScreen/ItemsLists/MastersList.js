import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { townsInit } from "../../../store/townsManagement/actions";
import {
  initMasters,
  deleteMasterFromState,
} from "../../../store/masterManagement/actions";
import { changeListIsLoad } from "../../../store/adminModalWindows/actions";
import deleteDataFromServer from "../services/deleteDataFromServer";
import List from "../../List";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const MastersList = ({ history }) => {
  const state = useSelector((state) => {
    return {
      mastersArr: state.masterReducer.masters,
      listIsLoad: state.adminModalWindows.listIsLoad,
    };
  });
  const dispatch = useDispatch();

  function getMastersAndTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
      include: "all",
    };
    dispatch(changeListIsLoad(true));
    fetch(`${SERVERDOMAIN}/masters`, {
      headers,
      method: "POST",
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch(initMasters(data));
        dispatch(changeListIsLoad(false));
      })
      .catch((err) => {
        alert("Please, authorise");
        dispatch(initMasters([]));
        dispatch(changeListIsLoad(false));
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
      .then((data) => dispatch(townsInit(data)));
  }
  function deleteMasterById(masterId) {
    deleteDataFromServer(`${SERVERDOMAIN}/masters/delete/${masterId}`)
      .then((data) => {
        if (data.success) {
          dispatch(deleteMasterFromState(data.payload));
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <List
      dataArr={state.mastersArr}
      deleteAction={deleteMasterById}
      mainRows={["name", "rating"]}
      getData={getMastersAndTownsFromServerToState}
      history={history}
      listIsLoad={state.listIsLoad}
    />
  );
};

MastersList.propTypes = {
  history: PropTypes.object,
};

export default MastersList;
