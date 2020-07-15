import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import createUniqueId from "./services/createUniqueId";
import postData from "./services/postData";
import { SERVERDOMAIN } from "../../services/serverUrls";

import {changeAddMewTownFormIsLoad, addNewTown} from "../../store/adminPanel/actions";

function AddNewTownForm(props) {
  function handler(e) {
    e.preventDefault();
    let townName = e.target.town.value;
    if (townName) {
      if (
        props.townsArr.find(
          (item) => item.name.toLowerCase() === townName.toLowerCase()
        )
      ) {
        alert(
          "The name of this town is already on the list! \nPlease enter another town name!"
        );
        e.target.town.value = "";
      } else {
        townName =
          townName.charAt(0).toUpperCase() + townName.slice(1).toLowerCase();
        let infoObj = {
          name: townName,
          id: createUniqueId(props.townsArr),
        };
        props.changeAddMewTownFormIsLoad(true);
        postData(`${SERVERDOMAIN}/towns/post`, infoObj)
          .then((data) => {
            props.changeAddMewTownFormIsLoad(false);
            props.addNewTown(data);
          })
          .then(() => {
            alert("You added new town");
            props.history.push("/admin/townsList");
          })
          .catch((err) => alert(err));
      }
    } else {
      alert("Please, filling the gap");
    }
  }
  return (
    <form onSubmit={handler}>
      <div className="form-group row justify-content-sm-center">
        <label
          htmlFor="town"
          className="col-sm-4 col-lg-3 col-xl-3 col-form-label"
        >
          Enter new town
        </label>
        <div className="col-sm-5 col-xl-4">
          <input id="town" type="text" className="form-control" />
        </div>
      </div>
      <div className="row justify-content-sm-center">
        <input
          type="submit"
          value= {props.newTownFormIsLoad ? "Loading..." : "Add town"}
          className="btn btn-primary col-12 col-sm-4 mt-3"
        />
      </div>
    </form>
  );
}

AddNewTownForm.propTypes = {
  handler: PropTypes.func,
};

function mapStateToProps(state){
  return {
    newTownFormIsLoad: state.main_adminPanel_reduser.newTownFormIsLoad,
    townsArr: state.town_reduser.towns
  }
}

const actions = {
  changeAddMewTownFormIsLoad,
  addNewTown
};

export default connect(mapStateToProps, actions)(AddNewTownForm);
