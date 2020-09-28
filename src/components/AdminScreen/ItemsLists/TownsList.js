import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  deleteTownFromState,
  townsInit,
} from "../../../store/townsManagement/actions";
import { changeListIsLoad } from "../../../store/adminModalWindows/actions";
import deleteDataFromServer from "../services/deleteDataFromServer";

import List from "../../List";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const TownsList = ({ history }) => {
  const state = useSelector((state) => {
    return {
      townsArr: state.townReduser.towns,
      listIsLoad: state.adminModalWindows.listIsLoad,
    };
  });
  const dispatch = useDispatch();

  function getTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    dispatch(changeListIsLoad(true));
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => {
        dispatch(changeListIsLoad(false));
        dispatch(townsInit(data));
      })
      .catch((err) => {
        dispatch(changeListIsLoad(false));
        console.error(err);
      });
  }
  function deleteTownById(townId) {
    deleteDataFromServer(`${SERVERDOMAIN}/towns/delete/${townId}`)
      .then((data) => {
        if (data.success) {
          dispatch(deleteTownFromState(data.payload));
        }
      })
      .catch((err) => console.error(err));
  }
  return (
    <List
      dataArr={state.townsArr}
      deleteAction={deleteTownById}
      mainRows={["name", "id"]}
      getData={getTownsFromServerToState}
      history={history}
    />
  );
};

TownsList.propTypes = {
  history: PropTypes.object,
};

export default TownsList;
