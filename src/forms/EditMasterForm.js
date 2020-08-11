import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {updateMasterInState} from "../store/adminPanel/masters/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";

import EditForm from "./EditForm";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditMasterForm = ({match,history}) => {
  const state = useSelector(state=>{
    return {mastersArr: state.master_reducer.masters}
  });
  const dispatch = useDispatch();

  function editMasterHandler(e, newMasterObj) {
    e.preventDefault();
    putDataToServer(
      `${SERVERDOMAIN}/masters/put/${newMasterObj.id}`,
      newMasterObj
    )
      .then((data) => {
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
      arrFromState={state.mastersArr.map(item=>{return {...item, towns: ""}})}
    />
  );
};

EditMasterForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default EditMasterForm;
