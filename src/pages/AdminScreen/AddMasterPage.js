import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import postData from "../../components/AdminScreen/services/postData";
import SubscribeBtn from "../../components/FormComponents/Button";

import FormGroup from "../../components/FormComponents/FormGroup";
import NameField from "../../components/FormComponents/TextField";
import NumField from "../../components/FormComponents/NumField";
import Label from "../../components/FormComponents/Label";

import SelectTownsField from "../../components/CompleteFormFields/SelectTownsField";

import Context from "../../ContextComponent";

import { SERVERDOMAIN } from "../../services/serverUrls";

import {
  addNewMaster,
  changeAddNewMasterFormIsLoad,
} from "../../store/masterManagement/actions";

import { townsInit, changeTownsFromOrderFormIsLoad } from "../../store/townsManagement/actions";

function AddMasterPage() {
  const context = useContext(Context);
  const state = useSelector((state) => {
    return {
      newMasterFormIsLoad: state.masterReducer.newMasterFormIsLoad,
      townsArr: state.townReduser.towns,
      townsInOrderFormIsLoad: state.townReduser.townsInOrderFormIsLoad,
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
    dispatch(changeTownsFromOrderFormIsLoad(true));
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => {
        dispatch(townsInit(data));
        dispatch(changeTownsFromOrderFormIsLoad(false));
      });
  }
  function handler(e) {
    e.preventDefault();
    const targetElem = e.target;
    let name = targetElem.name.value;
    let rating = targetElem.rating.value;
    let towns = selectCheckedTowns(targetElem.elements);

    let infoObj = {
      name,
      rating,
      towns: towns.join(","),
    };

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

    dispatch(changeAddNewMasterFormIsLoad(true));
    postData(`${SERVERDOMAIN}/masters/post`, infoObj)
      .then((data) => {
        dispatch(changeAddNewMasterFormIsLoad(false));
        if (data.success) {
          dispatch(addNewMaster(data.payload));
          context.openSuccessWindowWithMsg(data.msg);
          targetElem.reset();
        } else {
          context.openErrorWindowWithMsg(data.msg);
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
    <form
      onSubmit={handler}
      onBlur={() => context.closeWrningTooltip()}
      className="mt-4 row justify-content-center"
    >
      <FormGroup>
        <Label forId={"rating"}>Enter rating</Label>
        <NumField max={5} min={0} id={"rating"} />
      </FormGroup>
      <FormGroup>
        <Label forId={"name"}>Enter name</Label>
        <NameField id={"name"} name={"name"} />
      </FormGroup>
      <SelectTownsField isLoad = {state.townsInOrderFormIsLoad} townsArr={state.townsArr} />
      <SubscribeBtn loading={state.newMasterFormIsLoad} value={"Add"} />
    </form>
  );
}

AddMasterPage.propTypes = {
  history: PropTypes.object,
};

export default AddMasterPage;
