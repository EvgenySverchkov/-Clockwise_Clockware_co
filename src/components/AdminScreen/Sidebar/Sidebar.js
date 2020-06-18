import React from 'react';
import {connect} from "react-redux";
import {toggleAddMasterForm, toggleShowMasterList, toggleShowClientsList, toogleAddTownForm} from "../../../store/adminPanel/actions";

function Sidebar(props){
  function showClients(){
    props.toggleShowClientsList(true);
    props.toggleAddMasterForm(false);
    props.toggleShowMasterList(false);
    props.toogleAddTownForm(false);
  }
  function showMasters(){
    props.toggleAddMasterForm(false);
    props.toggleShowMasterList(true);
    props.toggleShowClientsList(false);
    props.toogleAddTownForm(false);
  }
  function addNewMaster(e){
    props.toggleShowClientsList(false);
    props.toogleAddTownForm(false);
    e.stopPropagation();
    if(props.isAddMasterForm){
      props.toggleAddMasterForm(false);
      props.toggleShowMasterList(true);
    }else{
      props.toggleAddMasterForm(true);
      props.toggleShowMasterList(false);
    }
  }
  function addNewTown(e){
    props.toggleShowClientsList(false);
    props.toggleAddMasterForm(false);
    props.toggleShowMasterList(false);
    props.toogleAddTownForm(true);
  }
  return (
    <div className="sidebar">
      <ul style={{listStyle: 'none'}}>
        <li onClick={showClients}>
          Clients
        </li>
        <li onClick={showMasters}>
          Masters
          <button onClick={addNewMaster}>Add master</button>
        </li>
        <li>
          Towns
          <button onClick={addNewTown}>Add town</button>
        </li>
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
const actions = {
  toggleAddMasterForm,
  toggleShowMasterList,
  toggleShowClientsList,
  toogleAddTownForm
}
export default connect(mapStateToProps, actions)(Sidebar);
