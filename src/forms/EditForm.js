import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Label from "../components/FormComponents/Label";
import NumField from "../components/FormComponents/NumField";
import TextField from "../components/FormComponents/TextField";
import FormGroup from "../components/FormComponents/FormGroup";
import Button from "../components/FormComponents/Button";
import RadioBtn from "../components/FormComponents/RadioBtn";
import TimeField from "../components/FormComponents/TimeField";
import DateField from "../components/FormComponents/DateField";

import {townsInit} from "../store/adminPanel/towns/actions";
import {changeTownsFromOrderFormIsLoad} from "../store/clientSide/services/actions";

import { SERVERDOMAIN } from "../services/serverUrls";

function EditForm({ id, handler, arrFromState }) {
  useEffect(function () {
    getTownsFromServerToState();
    getMastersFromServer(SERVERDOMAIN);
  }, []);

  function getMastersFromServer(url){
    fetch(`${url}/masters`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        "Content-Type": "application/json",
        include: "all"
      }
    })
    .then(data=>data.json())
    .then(data=>{
      setMastersState(data);
    })
  }

  const dispatch = useDispatch();
  const state = useSelector((state)=>{
    return {
      townsArr: state.town_reduser.towns,
      townsInOrderFormIsLoad: state.client_services.townsInOrderFormIsLoad
    }
  });

  let obj = arrFromState.find((item) => item.id === id);
  let [stateObj, setStateObj] = useState({...obj});
  let [mastersState, setMastersState] = useState([]);
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
        dispatch(changeTownsFromOrderFormIsLoad(false))
        dispatch(townsInit(data))
      });
  }

  function changeValue(e) {
    setStateObj({ ...stateObj, [e.target.name]: e.target.value });
    if(e.target.name === "size"){
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
          setStateObj({ ...stateObj, "endTime": endOrderTime, [e.target.name]: e.target.value });
    }
    if(e.target.name === 'towns'){
        let arr = stateObj.towns.length === 0 ? [] : stateObj.towns.split(",");
        
        if(e.target.checked){
          if(arr.indexOf(e.target.value) === -1){
            arr.push(e.target.value)
          }
        }else{
          arr = arr.filter(item=>item===e.target.value? false : true)
        }
        console.log(arr)
        setStateObj({ ...stateObj, "towns": arr.length === 0 ? [] : arr.join(",") });
    }
  }
  function minDate() {
    let date = new Date();
    return `${date.getFullYear()}-${("0" + (+date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}`;
  }
  function maxDate(minDate){
    const datetime_regex = /(\d\d\d\d)-(\d\d)-(\d\d)/;
    const min_date_arr = datetime_regex.exec(minDate);
    min_date_arr.shift();
    min_date_arr[0] = +min_date_arr[0] + 1;
    
    return min_date_arr.join("-");
  }

  const currDate = minDate();
  function componentChanger(item){
    switch(item){
      case "towns":
        return (
          <FormGroup key={item}>
            <Label>Choose towns</Label>
            <div>
              {state.townsArr.map((item) => (
              <div key={item.id + 1} className="form-check-inline">
                <label className="form-check-label" htmlFor={item.name}>
                  <input
                    type="checkbox"
                    className="form-check-input towns"
                    id={item.name}
                    value={item.name}
                    name = "towns"
                    onChange = {changeValue}
                  />
                  {item.name}
                </label>
              </div>
              ))}
            </div>
          </FormGroup>
        );
      case "endTime":
        return null;
      case "masterId":
        return (
          <FormGroup key={item}>
            <Label forId={item}>Choose master</Label>
            <ul className="list-group">
            {
              mastersState.map(item=>(
                <li className="list-group-item" key={item.id}>
                  Name: {item.name}<br/>
                  Rating: {item.rating}<br/>
                  Towns: {item.towns}<br/>
                  <label className="form-check-label mr-2" htmlFor={item.id}>
                    Choose
                  </label>
                  <input type="radio" name = "masterId" value = {item.id} id={item.id} onChange = {changeValue}/>
                </li>
              ))}
          </ul>
          </FormGroup>
        );
      case "size":
        return (
          <FormGroup key={item}>
            <Label forId={item}>Choose {item}</Label>
            <RadioBtn
            id={"smallSize"}
            value={"small"}
            name={"size"}
            chngHandler={changeValue}
          >
            <Label forId={"smallSize"} isFontWeight={false}>
              Small
            </Label>
          </RadioBtn>
          <RadioBtn
            id={"middleSize"}
            value={"middle"}
            name={"size"}
            chngHandler={changeValue}
          >
            <Label forId={"middleSize"} isFontWeight={false}>
              Middle
            </Label>
          </RadioBtn>
          <RadioBtn
            id={"largeSize"}
            value={"large"}
            name={"size"}
            chngHandler={changeValue}
          >
            <Label forId={"largeSize"} isFontWeight={false}>
              Large
            </Label>
          </RadioBtn>
        </FormGroup>
        );
      case "date":
        return (          
        <FormGroup key={item}>
          <Label forId={item}>Enter {item}</Label>
          <DateField
          name={"date"}
          min={currDate}
          max = {maxDate(currDate)}
          chngHandler={changeValue}
          value={stateObj[item] || ""}
          />
        </FormGroup>
        );
      case "time":
        return (
          <FormGroup key={item}>
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
            name = {"rating"}
            value={stateObj[item] || ""}
            chngHandler={changeValue}
          />
          </FormGroup>
        );
      case "town":
        return (
        <FormGroup key={item}>
          <Label forId={item}>Choose {item}</Label>
          {
        state.townsInOrderFormIsLoad ?
        "Loading...":
        state.townsArr.map((item) => (
          <div key={item.id + 1} className="form-check-inline">
            <RadioBtn
              id={item.name}
              value={item.name}
              name={"town"}
              chngHandler={changeValue}
            >
              <Label forId={item.name} isFontWeight={false}>
                {item.name}
              </Label>
            </RadioBtn>
          </div>
        ))}
        </FormGroup>
        );
      default:
        return (
        <FormGroup key={item}>
          <Label forId={item}>Enter {item}</Label>
          <TextField
          id={item}
          name = {item}
          value={stateObj[item] || ""}
          chngHandler={changeValue}
        />
        </FormGroup>
        )
    }
  }
  return (
    <form
      onSubmit={(e) => handler(e, stateObj)}
      className="mt-4 row justify-content-center"
    >
      {keyArr.map((item) => {
        if (item === "id") {
          return null;
        } else {
          return componentChanger(item);
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