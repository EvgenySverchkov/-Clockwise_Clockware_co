import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import createUniqueId from "./services/createUniqueId";
import postData from "./services/postData";
import { SERVERDOMAIN } from "../../services/serverUrls";

import {changeAddNewMasterFormIsLoad, addNewMaster} from "../../store/adminPanel/actions";

function AddMasterForm(props) {
  function handler(e) {
    e.preventDefault();
    let masterName = e.target.name.value;
    let masterRating = e.target.rating.value;
    let townsArr = selectCheckedTowns(e.target.elements);
    if (masterName && masterRating && townsArr.length !== 0) {
      if (masterName.match(/\d/)) {
        alert("The string name must not contain numbers!!!!");
      } else {
        masterName =
          masterName.charAt(0).toUpperCase() +
          masterName.slice(1).toLowerCase();
        let infoObj = {
          id: createUniqueId(props.mastersArr),
          rating: masterRating,
          towns: townsArr.join(","),
          name: masterName,
        };
        props.changeAddNewMasterFormIsLoad(true);
        postData(`${SERVERDOMAIN}/masters/post`, infoObj)
          .then((data) => {
            props.changeAddNewMasterFormIsLoad(false);
            props.addNewMaster(data);
          })
          .then(() => {
            alert("You added new master");
            props.history.push("/admin/mastersList");
          })
          .catch((err) => alert(err));
      }
    } else {
      alert("Please, feeling all gaps");
    }
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

function mapStateToProps(state){
  return {
    newMasterFormIsLoad: state.main_adminPanel_reduser.newMasterFormIsLoad,
    townsArr: state.town_reduser.towns,
    mastersArr: state.master_reducer.masters
  }
}
const actions = {
  changeAddNewMasterFormIsLoad,
  addNewMaster
};
export default connect(mapStateToProps, actions)(AddMasterForm);
