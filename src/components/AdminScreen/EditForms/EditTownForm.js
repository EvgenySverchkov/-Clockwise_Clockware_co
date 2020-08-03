import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  changeEditFormIsLoad,
  updateTownInState,
} from "../../../store/adminPanel/actions";
import putDataToServer from "../services/putDataToServer";

import EditForm from "../../../forms/EditForm";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const EditTownForm = ({
  match,
  history,
  townsArr,
  changeEditFormIsLoad,
  updateTownInState,
}) => {
  function editTownHandler(e, newTownObj) {
    e.preventDefault();
    changeEditFormIsLoad(true);
    putDataToServer(`${SERVERDOMAIN}/towns/put/${newTownObj.id}`, newTownObj)
      .then((data) => {
        changeEditFormIsLoad(false);
        if (data.success) {
          alert(data.msg);
          updateTownInState(data);
          history.push("/admin/townsList");
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <EditForm
      id={+match.params.id}
      handler={editTownHandler}
      arrFromState={townsArr}
    />
  );
};

EditTownForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  townsArr: PropTypes.array.isRequired,
  changeEditFormIsLoad: PropTypes.func,
  updateTownInState: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    townsArr: state.town_reduser.towns,
  };
};

const actions = {
  changeEditFormIsLoad,
  updateTownInState,
};

export default connect(mapStateToProps, actions)(EditTownForm);
