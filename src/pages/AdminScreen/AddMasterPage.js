import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import postData from "../../components/AdminScreen/services/postData";
import SubscribeBtn from "../../components/FormComponents/Button";

import FormGroup from "../../components/FormComponents/FormGroup";
import NameField from "../../components/FormComponents/TextField";
import NumField from "../../components/FormComponents/NumField";
import Label from "../../components/FormComponents/Label";

import SelectTownsField from "../../components/CompleteFormFields/SelectTownsField";

import { SERVERDOMAIN } from "../../services/serverUrls";

import { addNewMaster } from "../../store/adminPanel/masters/actions";
import {
  changeAddNewMasterFormIsLoad,
  changeSuccessModalDataAdmin,
  changeModalWarningDataAdmin,
} from "../../store/adminPanel/services/actions";
import { townsInit } from "../../store/adminPanel/towns/actions";

function AddMasterPage({ history }) {
  const state = useSelector((state) => {
    return {
      newMasterFormIsLoad: state.mainAdminPanelReduser.newMasterFormIsLoad,
      townsArr: state.townReduser.towns,
    };
  });
  const dispatch = useDispatch();

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
      .then((data) => dispatch(townsInit(data)));
  }
  function handler(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let rating = e.target.rating.value;
    let towns = selectCheckedTowns(e.target.elements);
    dispatch(changeAddNewMasterFormIsLoad(true));
    let infoObj = {
      name,
      rating,
      towns: towns.join(","),
    };
    postData(`${SERVERDOMAIN}/masters/post`, infoObj)
      .then((data) => {
        dispatch(changeAddNewMasterFormIsLoad(false));
        if (data.success) {
          dispatch(addNewMaster(data.payload));
          dispatch(
            changeSuccessModalDataAdmin({
              msg: data.msg,
              backBtnTxt: "Back to masters list",
              backTo: "/admin/mastersList",
            })
          );
          history.push("/admin");
          document.getElementById("callSuccessModalBtn").click();
        } else {
          dispatch(changeModalWarningDataAdmin({ msg: data.msg }));
          document.getElementById("callWarningModalBtn").click();
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
      <SelectTownsField townsArr = {state.townsArr}/>
      <SubscribeBtn isLoad={state.newMasterFormIsLoad} value={"Add"} />
    </form>
  );
}

AddMasterPage.propTypes = {
  history: PropTypes.object,
};

export default AddMasterPage;
