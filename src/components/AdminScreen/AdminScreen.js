import React, {useState} from 'react';
import {connect} from "react-redux";
import {addNewMaster, toggleAddMasterForm, toggleShowMasterList} from "../../store/actions";

import Sidebar from "./Sidebar";
import MastersList from "./MastersList"

function AdminSrcreen(props){
	const [state, setState] = useState();
	function createUniqueId(){
		if(props.mastersArr.length === 0){
			return 1;
		}else{
			let copyArr = [...props.mastersArr];
			let sortArr = copyArr.sort((firstItem,secondItem)=>firstItem.id - secondItem.id);
			return sortArr[sortArr.length-1].id + 1;
		}

	}
	function submitHandler(e){
		e.preventDefault();
		let masterName = e.target.name.value;
		let masterRating = e.target.rating.value;
		if(masterName||masterRating){
			let infoObj = {
				name: e.target.name.value,
				rating: e.target.rating.value,
				id: createUniqueId()
			}
			props.addNewMaster(infoObj);
			props.toggleAddMasterForm(false);
			props.toggleShowMasterList(true);
			alert("You added new master")
		}else{
			alert("Please, feeling all gaps")
		}
	}
	function toggleAddMasterForm(){
			if(props.isAddMasterForm){
				return (
				<form onSubmit={submitHandler}>
					<label htmlFor="rating">Enter reting</label>
					<input id="rating" type="number" min="0" max="5"></input>
					<label htmlFor="name">Enter name</label>
					<input id="name"></input>
					<input type="submit" value="Add"></input>
				</form>
			)
			}
	}
	function toggleShowMasterList(){
		console.log(props.isMasterList)
		if(props.isMasterList){
			console.log(props.mastersArr)
			return <MastersList mastersArr = {props.mastersArr} />
		}
	}
	return(
		<div style={style}>
			<Sidebar />
			<div className="itemsList">
				{toggleAddMasterForm()}
				{toggleShowMasterList()}
			</div>
		</div>);
	}

function mapStateToProps(state){
	return {
		mastersArr: state.master_reducer.masters,
		isAddMasterForm: state.master_reducer.isAddMaster,
		townsArr:state.master_reducer.towns,
		isMasterList: state.master_reducer.isMasterList
	}
}
const style={
	display: "grid",
	gridTemplateColumns: "25% 75%"
}
export default connect(mapStateToProps, {addNewMaster, toggleAddMasterForm, toggleShowMasterList})(AdminSrcreen);
// <label htmlFor="towns">Choose town</label>
// <select id="towns" multiple>
// 	{
// 		props.townsArr.map((item)=><option key={item}>{item}</option>)
// 	}
// </select>
