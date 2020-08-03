import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {updateTownInState} from "../../../store/adminPanel/actions";
import putDataToServer from "../services/putDataToServer";

import EditForm from "../../../forms/EditForm";

import { SERVERDOMAIN } from "../../../services/serverUrls";

const EditTownForm = ({match,history}) => {
  const state = useSelector(state=>{
    return {townsArr: state.town_reduser.towns}
  });
  const dispatch = useDispatch();

  function editTownHandler(e, newTownObj) {
    e.preventDefault();
    putDataToServer(`${SERVERDOMAIN}/towns/put/${newTownObj.id}`, newTownObj)
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          dispatch(updateTownInState(data));
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
      arrFromState={state.townsArr}
    />
  );
};

EditTownForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default EditTownForm;
