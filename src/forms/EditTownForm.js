import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateTownInState } from "../store/townsManagement/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";

import EditForm from "./EditForm";

import Context from "../ContextComponent";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditTownForm = ({ match, history }) => {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return { townsArr: state.townReduser.towns };
  });
  const dispatch = useDispatch();

  function editTownHandler(e, newTownObj) {
    e.preventDefault();
    const targetElem = e.target;
    if (!targetElem.name.value.match(/^[A-Z]/)) {
      context.openWarningTooltip(
        "The string name must start with capital letter",
        targetElem.name.id
      );
      return false;
    }

    if (targetElem.name.value.match(/\d/)) {
      context.openWarningTooltip(
        "The string name must not contain numbers!",
        targetElem.name.id
      );
      return false;
    }
    if (!targetElem.name.value.match(/\b\w{3,}\b/)) {
      context.openWarningTooltip(
        "String name should not be shorter than 3 characters!",
        targetElem.name.id
      );
      return false;
    }

    if (targetElem.name.value.match(/\W/)) {
      context.openWarningTooltip(
        "String name should not containt punctuation characters and space character!",
        targetElem.name.id
      );
      return false;
    }

    putDataToServer(`${SERVERDOMAIN}/towns/put/${newTownObj.id}`, newTownObj)
      .then((data) => {
        if (data.success) {
          context.openSuccessWindowWithMsg(data.msg);
          dispatch(updateTownInState(data));
        } else {
          context.openErrorWindowWithMsg(data.msg);
        }
      })
      .catch((err) => context.openErrorWindowWithMsg(err));
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
  history: PropTypes.object,
};

export default EditTownForm;
