import React from 'react';
import {connect} from "react-redux";
import {toggleAddMasterForm, toggleShowMasterList, toggleShowClientsList, toogleAddTownForm, toggleShowTownList} from "../../../store/adminPanel/actions";

function Sidebar(props){
  function showClients(){
    props.toggleShowClientsList(true);
    props.toggleAddMasterForm(false);
    props.toggleShowMasterList(false);
    props.toogleAddTownForm(false);
    props.toggleShowTownList(false);
  }
  function showMasters(){
    props.toggleShowMasterList(true);
    props.toggleAddMasterForm(false);
    props.toggleShowClientsList(false);
    props.toogleAddTownForm(false);
    props.toggleShowTownList(false);
  }
  function addNewMaster(e){
    props.toggleShowClientsList(false);
    props.toogleAddTownForm(false);
    props.toggleShowTownList(false);
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
    e.stopPropagation();
    props.toogleAddTownForm(true);
    props.toggleShowClientsList(false);
    props.toggleAddMasterForm(false);
    props.toggleShowMasterList(false);
    props.toggleShowTownList(false);
  }
  function showTownsList(){
    props.toggleShowTownList(true);
    props.toggleShowClientsList(false);
    props.toggleAddMasterForm(false);
    props.toggleShowMasterList(false);
    props.toogleAddTownForm(false);
  }
  return (
    <div className="sidebar">
      <ul style={{listStyle: 'none'}}>
        <li onClick={showClients}>
          Clients
        </li>
        <li onClick={showMasters}>
          Masters<br/>
          <button onClick={addNewMaster}>Add master</button>
        </li>
        <li onClick={showTownsList}>
          Towns<br/>
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
  toogleAddTownForm,
  toggleShowTownList
}
export default connect(mapStateToProps, actions)(Sidebar);
