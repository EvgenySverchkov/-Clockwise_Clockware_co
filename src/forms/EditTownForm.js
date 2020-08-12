import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateTownInState } from "../store/adminPanel/towns/actions";
import putDataToServer from "../components/AdminScreen/services/putDataToServer";
import {
  changeSuccessModalDataAdmin,
  changeModalWarningDataAdmin,
} from "../store/adminPanel/services/actions";

import EditForm from "./EditForm";

import { SERVERDOMAIN } from "../services/serverUrls";

const EditTownForm = ({ match, history }) => {
  const state = useSelector((state) => {
    return { townsArr: state.town_reduser.towns };
  });
  const dispatch = useDispatch();

  function editTownHandler(e, newTownObj) {
    e.preventDefault();
    putDataToServer(`${SERVERDOMAIN}/towns/put/${newTownObj.id}`, newTownObj)
      .then((data) => {
        if (data.success) {
          dispatch(
            changeSuccessModalDataAdmin({
              msg: data.msg,
              backBtnTxt: "Go to the list of masters",
              backTo: "/admin/townsList",
            })
          );
          document.getElementById("callSuccessModalBtn").click();
          history.push("/admin");
          dispatch(updateTownInState(data));
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
