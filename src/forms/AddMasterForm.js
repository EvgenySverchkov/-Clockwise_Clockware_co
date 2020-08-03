import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import postData from "../components/AdminScreen/services/postData";
import SubscribeBtn from "../components/FormComponents/Button";
import FormGroup from "../components/FormComponents/FormGroup";
import NameField from "../components/FormComponents/TextField";
import NumField from "../components/FormComponents/NumField";
import Label from "../components/FormComponents/Label";
import { SERVERDOMAIN } from "../services/serverUrls";

import {
  changeAddNewMasterFormIsLoad,
  addNewMaster,
  townsInit,
} from "../store/adminPanel/actions";

function AddMasterForm(props) {
  useEffect(function () {
    getTownsFromServerToState();
  }, []);

  function getTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => props.townsInit(data));
  }
  function handler(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let rating = e.target.rating.value;
    let towns = selectCheckedTowns(e.target.elements);
    props.changeAddNewMasterFormIsLoad(true);
    let infoObj = {
      name,
      rating,
      towns: towns.join(","),
    };
    postData(`${SERVERDOMAIN}/masters/post`, infoObj)
      .then((data) => {
        props.changeAddNewMasterFormIsLoad(false);
        if (data.success) {
          alert(data.msg);
          props.addNewMaster(data.payload);
          props.history.push("/admin/mastersList");
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => alert(err));

    function selectCheckedTowns(elements) {
      let newArr = Array.from(elements);
      let towns = [];
      newArr.forEach((item) => {
        if (item.className.match(/\btowns\b/)) {
          if (item.checked) {
            towns.push(item.value);
          }
        }
      });
      return towns;
    }
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <FormGroup>
        <Label forId={"rating"}>Enter rating</Label>
        <NumField max={5} min={0} id={"rating"} />
      </FormGroup>
      <FormGroup>
        <Label forId={"name"}>Enter name</Label>
        <NameField id={"name"} name={"name"} />
      </FormGroup>
      <FormGroup isRow={false}>
        <div className="mb-2">Choose town</div>
        <div>
          {props.townsArr.map((item) => (
            <div key={item.id + 1} className="form-check-inline">
              <label className="form-check-label" htmlFor={item.name}>
                <input
                  type="checkbox"
                  className="form-check-input towns"
                  id={item.name}
                  value={item.name}
                />
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </FormGroup>
      <SubscribeBtn isLoad={props.newMasterFormIsLoad} value={"Add"} />
    </form>
  );
}

AddMasterForm.propTypes = {
  handler: PropTypes.func,
  townsArr: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    newMasterFormIsLoad: state.main_adminPanel_reduser.newMasterFormIsLoad,
    townsArr: state.town_reduser.towns,
    mastersArr: state.master_reducer.masters,
  };
}
const actions = {
  changeAddNewMasterFormIsLoad,
  addNewMaster,
  townsInit,
};
export default connect(mapStateToProps, actions)(AddMasterForm);
