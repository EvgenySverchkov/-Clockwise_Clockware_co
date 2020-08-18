import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateMasterInState } from "../store/adminPanel/masters/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";
import {
  changeSuccessModalDataAdmin,
  changeModalWarningDataAdmin,
} from "../store/adminPanel/services/actions";

import EditForm from "./EditForm";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditMasterForm = ({ match, history }) => {
  const state = useSelector((state) => {
    return { mastersArr: state.masterReducer.masters };
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
          dispatch(
            changeSuccessModalDataAdmin({
              msg: data.msg,
              backBtnTxt: "Go to the list of masters",
              backTo: "/admin/mastersList",
            })
          );
          document.getElementById("callSuccessModalBtn").click();
          dispatch(updateMasterInState(data));
          history.push("/admin");
        } else {
          dispatch(changeModalWarningDataAdmin({ msg: data.msg }));
          document.getElementById("callWarningModalBtn").click();
        }
      })
      .catch((err) => alert(err));
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
