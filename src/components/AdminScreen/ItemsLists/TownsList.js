import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  deleteTownFromState,
  townsInit,
} from "../../../store/adminPanel/towns/actions";
import deleteDataFromServer from "../services/deleteDataFromServer";

import List from "../List";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const TownsList = ({ history }) => {
  const state = useSelector(state=>{
    return {townsArr: state.town_reduser.towns}
  });
  const dispatch = useDispatch();

  function getTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => dispatch(townsInit(data)));
  }
  function deleteTownById(townId) {
    deleteDataFromServer(`${SERVERDOMAIN}/towns/delete/${townId}`)
      .then((data) => {
        if (data.success) {
          dispatch(deleteTownFromState(data.payload));
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
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
