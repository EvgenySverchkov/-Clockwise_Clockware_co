import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormGroup from "../FormComponents/FormGroup";
import Label from "../FormComponents/Label";
import Email from "../../components/FormComponents/EmailField";
import Name from "../FormComponents/TextField";
import SubmitButton from "../FormComponents/Button";

import Context from "../../ContextComponent";

import { changeEditUserDataIsLoad } from "../../store/userProfile/actions";

import { SERVERDOMAIN } from "../../services/serverUrls";

const UserSettings = () => {
  const context = useContext(Context);
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
    const tragetElem = e.target;
    let obj = {
      email: tragetElem.userMail.value,
      name: tragetElem.userName.value,
    };
    if (obj.name.length < 3) {
      context.openWarningTooltip(
        "Name must be at least 3 characters",
        tragetElem.userName.id
      );
      return false;
    }
    if (obj.name.match(/\d/)) {
      context.openWarningTooltip(
        "The string name must not contain numbers!",
        tragetElem.userName.id
      );
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
          const newUserData = JSON.stringify({ ...userInfo, name: obj.name });
          localStorage.setItem("user", newUserData);
          context.openSuccessWindowWithMsg(
            "Congratulations! You have updated your credentials"
          );
          dispatch(changeEditUserDataIsLoad(false));
        } else {
          context.openErrorWindowWithMsg(data.msg);
          dispatch(changeEditUserDataIsLoad(false));
        }
      })
      .catch((err) => {
        context.openErrorWindowWithMsg(err);
        dispatch(changeEditUserDataIsLoad(false));
      });
  }
  function changeHandler(e) {
    setUserNameState(e.target.value);
  }
  return (
    <form
      onSubmit={submitHandler}
      onBlur={() => context.closeWrningTooltip()}
      className="mt-4 row justify-content-center"
    >
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
