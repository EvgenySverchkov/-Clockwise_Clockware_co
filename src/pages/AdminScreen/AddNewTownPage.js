import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import postData from "../../components/AdminScreen/services/postData";
import FormGroup from "../../components/FormComponents/FormGroup";
import Label from "../../components/FormComponents/Label";
import TextField from "../../components/FormComponents/TextField";
import Button from "../../components/FormComponents/Button";

import Context from "../../ContextComponent";

import { SERVERDOMAIN } from "../../services/serverUrls";

import { addNewTown } from "../../store/townsManagement/actions";

import { changeAddMewTownFormIsLoad } from "../../store/townsManagement/actions";

function AddNewTownPage() {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return {
      newTownFormIsLoad: state.townReduser.newTownFormIsLoad,
    };
  });
  const dispatch = useDispatch();

  function handler(e) {
    e.preventDefault();
    const targetElem = e.target;
    let townName = targetElem.town.value;
    townName =
      townName.charAt(0).toUpperCase() + townName.slice(1).toLowerCase();
    let infoObj = {
      name: townName,
    };

    if (!targetElem.town.value.match(/^[A-Z]/)) {
      context.openWarningTooltip("The string name must start with capital letter", targetElem.town.id);
      return false;
    }

    if (targetElem.town.value.match(/\d/)) {
      context.openWarningTooltip("The string name must not contain numbers!", targetElem.town.id);
      return false;
    }

    if (!targetElem.town.value.match(/\b\w{3,}\b/)) {
      context.openWarningTooltip("String name should not be shorter than 3 characters!", targetElem.town.id);
      return false;
    }

    if (targetElem.town.value.match(/\W/)) {
      context.openWarningTooltip("String name should not containt punctuation characters and space character!", targetElem.town.id);
      return false;
    }

    dispatch(changeAddMewTownFormIsLoad(true));
    postData(`${SERVERDOMAIN}/towns/post`, infoObj)
      .then((data) => {
        if (data.success) {
          dispatch(addNewTown(data.payload));
          context.openSuccessWindowWithMsg(data.msg);
          targetElem.reset();
        } else {
          context.openErrorWindowWithMsg(data.msg);
        }
        dispatch(changeAddMewTownFormIsLoad(false));
      })
      .catch((err) => alert(err));
  }
  return (
    <form onSubmit={handler} onBlur={()=>context.closeWrningTooltip()} className="mt-4 row justify-content-center">
      <FormGroup>
        <Label forId="town">Enter new town</Label>
        <TextField id={"town"} />
      </FormGroup>
      <Button loading={state.newTownFormIsLoad} value={"Add town"} />
    </form>
  );
}

AddNewTownPage.propTypes = {
  history: PropTypes.object,
};

export default AddNewTownPage;
