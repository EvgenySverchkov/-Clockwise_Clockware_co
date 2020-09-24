import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateMasterInState } from "../store/masterManagement/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";

import EditForm from "./EditForm";

import Context from "../ContextComponent";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditMasterForm = ({ match }) => {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return { mastersArr: state.masterReducer.masters };
  });
  const dispatch = useDispatch();

  function editMasterHandler(e, newMasterObj) {
    e.preventDefault();
    const targetElem = e.target;
    if (
      targetElem.name.value.match(/\d/) ||
      !targetElem.name.value.match(/\b\w{3,20}\b/)
    ) {
      context.openWarningTooltip(
        "String name should:\n1. Not contain numbers\n2. Not be shorter than 3 characters\n3. Not longer than 20 characters\n4. Do not contain Cyrillic characters!",
        targetElem.name.id
      );
      return false;
    }
    if (+targetElem.rating.value <= 0 || +targetElem.rating.value > 5) {
      context.openWarningTooltip(
        "Rating value must be from 1 to 5 inclusive",
        targetElem.rating.id
      );
      return false;
    }

    putDataToServer(
      `${SERVERDOMAIN}/masters/put/${newMasterObj.id}`,
      newMasterObj
    )
      .then((data) => {
        if (data.success) {
          context.openSuccessWindowWithMsg(data.msg);
          dispatch(updateMasterInState(data));
        } else {
          context.openErrorWindowWithMsg(data.msg);
        }
      })
      .catch((err) => context.openErrorWindowWithMsg(err));
  }
  return (
    <EditForm
      id={+match.params.id}
      handler={editMasterHandler}
      arrFromState={state.mastersArr.map((item) => {
        return { ...item, towns: "" };
      })}
    />
  );
};

EditMasterForm.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default EditMasterForm;
