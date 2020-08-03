import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  changeEditFormIsLoad,
  updateMasterInState,
} from "../../../store/adminPanel/actions";
import putDataToServer from "../services/putDataToServer";

import EditForm from "../../../forms/EditForm";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const EditMasterForm = ({match,history}) => {
  const state = useSelector(state=>{
    return {mastersArr: state.master_reducer.masters}
  });
  const dispatch = useDispatch();

  function editMasterHandler(e, newMasterObj) {
    e.preventDefault();
    dispatch(changeEditFormIsLoad(true));
    putDataToServer(
      `${SERVERDOMAIN}/masters/put/${newMasterObj.id}`,
      newMasterObj
    )
      .then((data) => {
        dispatch(changeEditFormIsLoad(false));
        if (data.success) {
          alert(data.msg);
          dispatch(updateMasterInState(data));
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
      arrFromState={state.mastersArr}
    />
  );
};

EditMasterForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default EditMasterForm;
