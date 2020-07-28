import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import postData from "./services/postData";
import FormGroup from "../FormComponents/FormGroup";
import Label from "../FormComponents/Label";
import TextField from "../FormComponents/TextField";
import Button from "../FormComponents/Button";

import { SERVERDOMAIN } from "../../services/serverUrls";

import {
  changeAddMewTownFormIsLoad,
  addNewTown,
} from "../../store/adminPanel/actions";


function AddNewTownForm(props) {
  function handler(e) {
    e.preventDefault();
    let townName = e.target.town.value;
    townName =
      townName.charAt(0).toUpperCase() + townName.slice(1).toLowerCase();
    let infoObj = {
      name: townName,
    };
    props.changeAddMewTownFormIsLoad(true);
    postData(`${SERVERDOMAIN}/towns/post`, infoObj)
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          props.addNewTown(data.payload);
          props.history.push("/admin/townsList");
        } else {
          alert(data.msg);
        }
        props.changeAddMewTownFormIsLoad(false);
      })
      .catch((err) => alert(err));
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <FormGroup>
        <Label forId="town">Enter new town</Label>
        <TextField id={"town"}/>
      </FormGroup>
      <Button isLoad = {props.newTownFormIsLoad} value={"Add town"}/>
    </form>
  );
}

AddNewTownForm.propTypes = {
  handler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    newTownFormIsLoad: state.main_adminPanel_reduser.newTownFormIsLoad,
    townsArr: state.town_reduser.towns,
  };
}

const actions = {
  changeAddMewTownFormIsLoad,
  addNewTown,
};

export default connect(mapStateToProps, actions)(AddNewTownForm);
