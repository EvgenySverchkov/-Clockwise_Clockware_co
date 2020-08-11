import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import postData from "../components/AdminScreen/services/postData";
import FormGroup from "../components/FormComponents/FormGroup";
import Label from "../components/FormComponents/Label";
import TextField from "../components/FormComponents/TextField";
import Button from "../components/FormComponents/Button";

import { SERVERDOMAIN } from "../services/serverUrls";

import {addNewTown} from "../store/adminPanel/towns/actions";
import {changeAddMewTownFormIsLoad, changeSuccessModalDataAdmin} from "../store/adminPanel/services/actions";

function AddNewTownForm({history}) {
  const state = useSelector(state=>{
    return {
      newTownFormIsLoad: state.main_adminPanel_reduser.newTownFormIsLoad
    }
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    let townName = e.target.town.value;
    townName =
      townName.charAt(0).toUpperCase() + townName.slice(1).toLowerCase();
    let infoObj = {
      name: townName,
    };
    dispatch(changeAddMewTownFormIsLoad(true));
    postData(`${SERVERDOMAIN}/towns/post`, infoObj)
      .then((data) => {
        if (data.success) {
          dispatch(addNewTown(data.payload));
          dispatch(changeSuccessModalDataAdmin({msg: data.msg, backBtnTxt: "Go to the list of towns", backTo: "/admin/townsList"}));
          history.push("/admin");
          document.getElementById("callSuccessModalBtn").click();
        } else {
          alert(data.msg);
        }
        dispatch(changeAddMewTownFormIsLoad(false));
      })
      .catch((err) => alert(err));
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <FormGroup>
        <Label forId="town">Enter new town</Label>
        <TextField id={"town"} />
      </FormGroup>
      <Button isLoad={state.newTownFormIsLoad} value={"Add town"} />
    </form>
  );
}

AddNewTownForm.propTypes = {
  history: PropTypes.object,
};

export default AddNewTownForm;
