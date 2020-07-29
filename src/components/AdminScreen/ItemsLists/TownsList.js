import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  deleteTownFromState,
  townsInit,
} from "../../../store/adminPanel/actions";
import deleteDataFromServer from "../services/deleteDataFromServer";

import List from "../List";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const TownsList = ({ townsArr, townsInit, deleteTownFromState, history }) => {
  function getTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => townsInit(data));
  }
  function deleteTownById(townId) {
    deleteDataFromServer(`${SERVERDOMAIN}/towns/delete/${townId}`)
      .then((data) => {
        if (data.success) {
          deleteTownFromState(data.payload);
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <List
      dataArr={townsArr}
      deleteAction={deleteTownById}
      mainRows={["name", "id"]}
      getData={getTownsFromServerToState}
      history={history}
    />
  );
};

TownsList.propTypes = {
  townsArr: PropTypes.array.isRequired,
  townsInit: PropTypes.func.isRequired,
  deleteTownFromState: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    townsArr: state.town_reduser.towns,
  };
};

const actions = {
  townsInit,
  deleteTownFromState,
};

export default connect(mapStateToProps, actions)(TownsList);
