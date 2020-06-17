import React from 'react';
import {connect} from "react-redux";
import {toggleAddMasterForm} from "../../../services/actions";

function Sidebar(props){
  function showMasters(){
    console.log(props.state)
  }
  function addNewMaster(e){
    e.stopPropagation();
    if(props.isAddMasterForm){
      props.toggleAddMasterForm(false)
    }else{
      props.toggleAddMasterForm(true)
    }

  }
  return (
    <div className="sidebar">
      <ul>
        <li>Clients</li>
        <li onClick={showMasters}>
          Masters
          <button onClick={addNewMaster}>Add master</button>
        </li>
        <li>Towns</li>
      </ul>
    </div>
  );
}

function mapStateToProps(state){
	return {
		mastersArr: state.master_reducer.masters,
    isAddMasterForm: state.master_reducer.isAddMaster,
	}
}

export default connect(mapStateToProps, {toggleAddMasterForm})(Sidebar);
