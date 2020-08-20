import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormGroup from "../FormComponents/FormGroup";
import Label from "../FormComponents/Label";
import Email from "../../components/FormComponents/EmailField";
import Name from "../FormComponents/TextField";
import SubmitButton from "../FormComponents/Button";

import {
  changeWarningModalData,
  changeSuccessModalData,
} from "../../store/clientModalWindows/actions";
import { changeEditUserDataIsLoad } from "../../store/userProfile/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

const UserSettings = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userDataEditIsLoad: state.userProfileReducer.editUserDataIsLoad,
    };
  });
  const userInfo = JSON.parse(localStorage.getItem("user"));
  let [userNameState, setUserNameState] = useState(userInfo.name);
  function submitHandler(e) {
    e.preventDefault();
    let obj = {
      email: e.target.userMail.value,
      name: e.target.userName.value,
    };
    if (obj.name.length < 3) {
      dispatch(
        changeWarningModalData({ msg: "Name must be at least 3 characters" })
      );
      document.getElementById("callWarningModalBtn").click();
      return false;
    }
    if (obj.name.match(/\d/)) {
      dispatch(
        changeWarningModalData({
          msg: "The string name must not contain numbers!",
        })
      );
      document.getElementById("callWarningModalBtn").click();
      return false;
    }
    dispatch(changeEditUserDataIsLoad(true));
    fetch(`${SERVERDOMAIN}/updateUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(obj),
    })
      .then((json) => json.json())
      .then((data) => {
        if (data.succes) {
          dispatch(
            changeSuccessModalData({
              msg: "Congratulations! You have updated your credentials",
              backBtnTxt: "Back to the main page",
              backTo: "/",
            })
          );
          document.getElementById("callSuccessModalBtn").click();
          dispatch(changeEditUserDataIsLoad(false));
        } else {
          dispatch(changeWarningModalData({ msg: data.msg }));
          document.getElementById("callWarningModalBtn").click();
          dispatch(changeEditUserDataIsLoad(false));
        }
      })
      .catch((err) => {
        dispatch(changeWarningModalData({ msg: err }));
        document.getElementById("callWarningModalBtn").click();
        dispatch(changeEditUserDataIsLoad(false));
      });
  }
  function changeHandler(e) {
    setUserNameState(e.target.value);
  }
  return (
    <form onSubmit={submitHandler} className="mt-4 row justify-content-center">
      <FormGroup>
        <Label forId={"userMail"}>Your email</Label>
        <Email id={"userMail"} value={userInfo.email} readonly={true} />
      </FormGroup>
      <FormGroup>
        <Label forId={"userName"}>Your name</Label>
        <Name
          id={"userName"}
          value={userNameState}
          chngHandler={changeHandler}
        />
      </FormGroup>
      <SubmitButton value={"Edit profile"} loading={state.userDataEditIsLoad} />
    </form>
  );
};

export default UserSettings;
