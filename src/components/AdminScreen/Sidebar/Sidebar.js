import React from 'react';
import {connect} from "react-redux";
import {toggleAddMasterForm, toggleShowMasterList} from "../../../store/actions";

function Sidebar(props){
  function showMasters(){
    props.toggleAddMasterForm(false);
    props.toggleShowMasterList(true);
  }
  function addNewMaster(e){
    e.stopPropagation();
    if(props.isAddMasterForm){
      props.toggleAddMasterForm(false)
      props.toggleShowMasterList(true)
    }else{
      props.toggleAddMasterForm(true)
      props.toggleShowMasterList(false)
    }

  }
  return (
    <div className="sidebar">
      <ul style={{listStyle: 'none'}}>
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
    isMasterList: state.master_reducer.isMasterList
	}
}

export default connect(mapStateToProps, {toggleAddMasterForm, toggleShowMasterList})(Sidebar);
