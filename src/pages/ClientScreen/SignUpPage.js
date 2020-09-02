import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { changeSignUpIsLoad } from "../../store/auth/actions";

import SignUpForm from "../../forms/SignUpForm";

import Context from "../../ContextComponent";

import { SERVERDOMAIN } from "../../services/serverUrls";

function RegistrationForm({ history }) {
  const context = useContext(Context);

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();

    const elem = e.target;
    if (!elem.name.value || !elem.email.value || !elem.password.value) {
      context.openErrorWindowWithMsg("Please, fill all fields!");
      return false;
    }
    if (elem.name.value.match(/\d/) || !elem.name.value.match(/\b\w{3,20}\b/)) {
      context.openWarningTooltip(
        "String name should:\n1. Not contain numbers\n2. Not be shorter than 3 characters\n3. Not longer than 20 characters\n4. Do not contain Cyrillic characters!",
        elem.name.id
      );
      return false;
    }
    if (elem.email) {
      if (!elem.email.value.match(/^\w+@[a-zA-Z_0-9]+?\.[a-zA-Z]{2,}$/)) {
        context.openWarningTooltip(
          "Invalid email format. Please check your email!",
          elem.email.id
        );
        return false;
      }
      if (elem.email.value.toLowerCase().match(/admin/)) {
        context.openWarningTooltip(
          "Your email cannot contain the word 'admin'",
          elem.email.id
        );
        return false;
      }
    }
    if (elem.password.value.length < 4 || elem.password.value.length > 16) {
      context.openWarningTooltip(
        "Password must not be less than 4 characters and must not be longer than 16 characters!",
        elem.password.id
      );
      return false;
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
          context.openErrorWindowWithMsg(data.msg);
        } else {
          context.openSuccessWindowWithMsg(
            `Congratulations! ${data.user.name} you are registered`
          );
          elem.reset();
        }
      });
  }
  return <SignUpForm handler={submitHandler} />;
}

RegistrationForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RegistrationForm;
