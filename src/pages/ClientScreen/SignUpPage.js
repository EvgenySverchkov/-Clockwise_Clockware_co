import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  changeSuccessModalData,
  changeWarningModalData,
} from "../../store/clientModalWindows/actions";

import {changeSignUpIsLoad} from "../../store/auth/actions"

import { SERVERDOMAIN } from "../../services/serverUrls";

import SignUpForm from "../../forms/SignUpForm";

function RegistrationForm({ history }) {
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    const elem = e.target;
    if(!elem.name.value || !elem.email.value || !elem.password.value ){
      dispatch(
        changeWarningModalData({
          msg: "Please, fill all fields!",
        })
      );
      document.getElementById("callWarningModalBtn").click();
      return false;
    }
    if(elem.email){
      if (!elem.email.value.match(/^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,}$/)) {
        dispatch(
          changeWarningModalData({
            msg: "Invalid email format. Please check your email!",
          })
        );
        document.getElementById("callWarningModalBtn").click();
        return false;
      }
      if (elem.email.value.toLowerCase().match(/admin/)) {
        dispatch(
          changeWarningModalData({
            msg: "Your email cannot contain the word 'admin'",
          })
        );
        document.getElementById("callWarningModalBtn").click();
        return false;
      }
    }
    if(elem.password){
      if (elem.password.value.length < 4 || elem.password.value.length > 16) {
        dispatch(
          changeWarningModalData({
            msg: "Password must not be less than 4 characters and must not be longer than 16 characters!",
          })
        );
        document.getElementById("callWarningModalBtn").click();
        return false;
      }
    }

    let newObj = {
      name: elem.name.value,
      email: elem.email.value,
      password: elem.password.value,
    };
    dispatch(changeSignUpIsLoad(true));
    fetch(`${SERVERDOMAIN}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newObj),
    })
      .then((data) => data.json())
      .then((data) => {
        dispatch(changeSignUpIsLoad(false));
        if (!data.success) {
          dispatch(
            changeWarningModalData({
              msg: data.msg,
            })
          );
          document.getElementById("callWarningModalBtn").click();
        } else {
          dispatch(
            changeSuccessModalData({
              msg: `Congratulations! ${data.user.name} you are registered`,
              backBtnTxt: "Back to the main page",
              backTo: "/",
            })
          );
          document.getElementById("callSuccessModalBtn").click();
          history.push("/client/login");
        }
      });
  }
  return <SignUpForm handler={submitHandler}/>;
}

RegistrationForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RegistrationForm;
