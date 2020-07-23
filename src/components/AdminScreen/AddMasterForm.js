import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import postData from "./services/postData";
import { SERVERDOMAIN } from "../../services/serverUrls";

import {
  changeAddNewMasterFormIsLoad,
  addNewMaster,
  townsInit
} from "../../store/adminPanel/actions";

function AddMasterForm(props) {
  useEffect(function(){
    getTownsFromServerToState()
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
      towns: towns.join(",")
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
      <div className="form-group row text-center text-sm-left col-sm-8 col-md-10 col-lg-8">
        <label htmlFor="rating" className="col-sm-4 pl-0 col-form-label">
          Enter rating
        </label>
        <div className="col-sm-3">
          <input
            id="rating"
            className="form-control"
            type="number"
            min="0"
            max="5"
          />
        </div>
      </div>
      <div className="form-group row text-center text-sm-left col-sm-8 col-md-10 col-lg-8">
        <label htmlFor="name" className="col-sm-4 pl-0 col-form-label">
          Enter name
        </label>
        <div className="col-sm-8">
          <input id="name" className="form-control" />
        </div>
      </div>
      <div className="form-group text-center text-sm-left col-sm-8 col-md-10 col-lg-8">
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
      </div>
      <div className="row justify-content-sm-center col-12">
        <input
          type="submit"
          value={props.newMasterFormIsLoad ? "Loading..." : "Add"}
          className="btn btn-primary col-12 col-sm-4 mt-3"
        />
      </div>
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
  townsInit
};
export default connect(mapStateToProps, actions)(AddMasterForm);
