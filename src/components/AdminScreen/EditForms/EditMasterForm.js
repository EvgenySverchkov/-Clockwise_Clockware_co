import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  changeEditFormIsLoad,
  updateMasterInState,
} from "../../../store/adminPanel/actions";
import putDataToServer from "../services/putDataToServer";

import EditForm from "../../../forms/EditForm";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const EditMasterForm = ({
  match,
  history,
  mastersArr,
  changeEditFormIsLoad,
  updateMasterInState,
}) => {
  function editMasterHandler(e, newMasterObj) {
    e.preventDefault();
    changeEditFormIsLoad(true);
    putDataToServer(
      `${SERVERDOMAIN}/masters/put/${newMasterObj.id}`,
      newMasterObj
    )
      .then((data) => {
        changeEditFormIsLoad(false);
        if (data.success) {
          alert(data.msg);
          updateMasterInState(data);
          history.push("/admin/mastersList");
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));
  }
  return (
    <EditForm
      id={+match.params.id}
      handler={editMasterHandler}
      arrFromState={mastersArr}
    />
  );
};

EditMasterForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  mastersArr: PropTypes.array.isRequired,
  changeEditFormIsLoad: PropTypes.func.isRequired,
  updateMasterInState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    mastersArr: state.master_reducer.masters,
  };
};

const actions = {
  changeEditFormIsLoad,
  updateMasterInState,
};

export default connect(mapStateToProps, actions)(EditMasterForm);
