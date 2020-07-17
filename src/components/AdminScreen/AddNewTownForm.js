import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import postData from "./services/postData";
import { SERVERDOMAIN } from "../../services/serverUrls";

import {changeAddMewTownFormIsLoad, addNewTown} from "../../store/adminPanel/actions";

function AddNewTownForm(props) {
  function handler(e) {
    e.preventDefault();
    let townName = e.target.town.value;
      townName =
          townName.charAt(0).toUpperCase() + townName.slice(1).toLowerCase();
        let infoObj = {
          name: townName,
        };
        props.changeAddMewTownFormIsLoad(true);
        postData(`${SERVERDOMAIN}/towns/post`, infoObj)
          .then((data) => {
            if(data.success){
              alert(data.msg);
              props.addNewTown(data.payload);
              props.history.push("/admin/townsList");
            }else{
              alert(data.msg);
            }
            props.changeAddMewTownFormIsLoad(false);
          })
          .catch((err) => alert(err));

    
  }
  return (
    <form onSubmit={handler} className="mt-4 row justify-content-center">
      <div className="form-group row text-center text-sm-left col-sm-8 col-md-10 col-lg-8">
        <label
          htmlFor="town"
          className="col-sm-4 pl-0 col-form-label"
        >
          Enter new town
        </label>
        <div className="col-sm-8">
          <input id="town" type="text" className="form-control" />
        </div>
      </div>
      <div className="row justify-content-sm-center col-12">
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
