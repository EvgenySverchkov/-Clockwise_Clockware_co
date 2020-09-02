import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Label from "../components/FormComponents/Label";
import NumField from "../components/FormComponents/NumField";
import FormGroup from "../components/FormComponents/FormGroup";
import Button from "../components/FormComponents/Button";
import TimeField from "../components/FormComponents/TimeField";
import DateField from "../components/FormComponents/DateField";

import ChooseClockSizeField from "../components/CompleteFormFields/ChooseClockSizeField";
import ChooseTownsField from "../components/CompleteFormFields/ChooseTownField";
import SelectTownsField from "../components/CompleteFormFields/SelectTownsField";
import TextFieldWithLabel from "../components/CompleteFormFields/TextFieldWithLabel";

import Context from "../ContextComponent";

import { townsInit } from "../store/townsManagement/actions";
import { changeTownsFromOrderFormIsLoad } from "../store/towns/actions";

import { SERVERDOMAIN } from "../services/serverUrls";

function EditForm({ id, handler, arrFromState }) {
  const context = useContext(Context);
  useEffect(function () {
    getTownsFromServerToState();
    getMastersFromServer(SERVERDOMAIN);
  }, []);

  function getMastersFromServer(url) {
    fetch(`${url}/masters`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        "Content-Type": "application/json",
        include: "all",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setMastersFromServer(data);
      });
  }

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      townsArr: state.townReduser.towns,
      townsInOrderFormIsLoad: state.clientTownsReduser.townsInOrderFormIsLoad,
    };
  });

  let obj = arrFromState.find((item) => item.id === id);
  let [stateObj, setStateObj] = useState({ ...obj });
  let [mastersState, setMastersState] = useState([]);
  let [mastersFromServer, setMastersFromServer] = useState([]);
  let keyArr = Object.keys(stateObj || {});

  function getTownsFromServerToState() {
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
    };
    dispatch(changeTownsFromOrderFormIsLoad(true));
    fetch(`${SERVERDOMAIN}/towns`, { headers })
      .then((json) => json.json())
      .then((data) => {
        dispatch(changeTownsFromOrderFormIsLoad(false));
        dispatch(townsInit(data));
      });
  }

  function changeValue(e) {
    setStateObj({ ...stateObj, [e.target.name]: e.target.value });
    if (e.target.name === "size") {
      let endOrderTime;
      let clientTimeHour = +stateObj.time.match(/\d\d/);
      let clientTimeMin = stateObj.time.match(/:\d\d$/);
      switch (e.target.value) {
        case "small":
          endOrderTime = clientTimeHour + 1 + clientTimeMin;
          break;
        case "middle":
          endOrderTime = clientTimeHour + 2 + clientTimeMin;
          break;
        case "large":
          endOrderTime = clientTimeHour + 3 + clientTimeMin;
          break;
        default:
          endOrderTime = 0;
      }
      setStateObj({
        ...stateObj,
        endTime: endOrderTime,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "towns") {
      let arr = stateObj.towns.length === 0 ? [] : stateObj.towns.split(",");
      if (e.target.checked) {
        if (arr.indexOf(e.target.value) === -1) {
          arr.push(e.target.value);
        }
      } else {
        arr = arr.filter((item) => (item === e.target.value ? false : true));
      }
      setStateObj({
        ...stateObj,
        towns: arr.length === 0 ? [] : arr.join(","),
      });
    }
    if (e.target.name === "town") {
      setMastersState(
        mastersFromServer.filter((item) =>
          item.towns.split(",").includes(e.target.value)
        )
      );
    }
  }
  function minDate() {
    let date = new Date();
    return `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  }
  function maxDate(minDate) {
    let date = new Date(minDate);
    date.setFullYear(date.getFullYear() + 1);
    return `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  }

  const currDate = minDate();
  function componentSelector(item) {
    switch (item) {
      case "towns":
        return (
          <SelectTownsField
            townsArr={state.townsArr}
            key={item}
            changeHandler={changeValue}
          />
        );
      case "endTime":
        return null;
      case "masterId":
        return (
          <FormGroup key={item} isRow={false}>
            <div className="mb-2 font-weight-bold">Choose master</div>
            <ul className="list-group">
              {mastersState.length === 0 ? (
                <li className="list-group-item">List is empty (choose town)</li>
              ) : (
                mastersState.map((item) => (
                  <li className="list-group-item" key={item.id}>
                    Name: {item.name}
                    <br />
                    Rating: {item.rating}
                    <br />
                    Towns: {item.towns}
                    <br />
                    <label className="form-check-label mr-2" htmlFor={item.id}>
                      Choose
                    </label>
                    <input
                      type="radio"
                      name="masterId"
                      value={item.id}
                      id={item.id}
                      onChange={changeValue}
                    />
                  </li>
                ))
              )}
            </ul>
          </FormGroup>
        );
      case "size":
        return <ChooseClockSizeField changeHandler={changeValue} key={item} />;
      case "date":
        return (
          <FormGroup key={item} isRow={false}>
            <Label forId={item}>Enter {item}</Label>
            <DateField
              name={"date"}
              min={currDate}
              max={maxDate(currDate)}
              chngHandler={changeValue}
              value={stateObj[item] || ""}
            />
          </FormGroup>
        );
      case "time":
        return (
          <FormGroup key={item} isRow={false}>
            <Label forId={item}>Enter {item}</Label>
            <TimeField
              name={"time"}
              chngHandler={changeValue}
              value={stateObj[item] || ""}
            />
          </FormGroup>
        );
      case "rating":
        return (
          <FormGroup key={item}>
            <Label forId={item}>Enter {item}</Label>
            <NumField
              id={item}
              min={0}
              max={5}
              name={"rating"}
              value={stateObj[item] || ""}
              chngHandler={changeValue}
            />
          </FormGroup>
        );
      case "town":
        return (
          <ChooseTownsField
            changeHandler={changeValue}
            isLoad={state.townsInOrderFormIsLoad}
            townsArr={state.townsArr}
            key={item}
          />
        );
      default:
        return (
          <TextFieldWithLabel
            fieldName={item}
            changeHandler={changeValue}
            value={stateObj[item] || ""}
            key={item}
          />
        );
    }
  }
  return (
    <form
      onSubmit={(e) => handler(e, stateObj)}
      className="mt-4 row justify-content-center"
      onBlur={()=>context.closeWrningTooltip()}
    >
      {keyArr.map((fieldName) => {
        if (fieldName === "id") {
          return null;
        } else {
          return componentSelector(fieldName);
        }
      })}
      <Button value={"Edit"} />
    </form>
  );
}

EditForm.propTypes = {
  id: PropTypes.number,
  handler: PropTypes.func,
  arrFromState: PropTypes.array,
};

export default EditForm;
