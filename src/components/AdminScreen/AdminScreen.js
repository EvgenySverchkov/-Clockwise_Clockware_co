import React, {useState} from 'react';
import {connect} from "react-redux";
import {addNewMaster, toggleAddMasterForm} from "../../services/actions";

import Sidebar from "./Sidebar"

function AdminSrcreen(props){
	const [state, setState] = useState();
	function submitHandler(e){
		e.preventDefault()
		let infoObj = {
			name: e.target.name.value,
			rating: e.target.rating.value,
		}
		props.addNewMaster(infoObj);
		props.toggleAddMasterForm(false);
		setState(<div>You added master</div>)
	}
	function toggleAddMasterForm(){
			if(props.isAddMasterForm){
				return (
				<form onSubmit={submitHandler}>
					<label htmlFor="rating">Enter reting</label>
					<input id="rating"></input>
					<label htmlFor="name">Enter name</label>
					<input id="name"></input>
					<input type="submit" value="Add"></input>
				</form>
			)
			}
	}
	return(
		<div>
			<Sidebar />
			<div className="itemsList">
				{toggleAddMasterForm()}
				{state}
			</div>
		</div>
	);
}

function mapStateToProps(state){
	return {
		mastersArr: state.master_reducer.masters,
		isAddMasterForm: state.master_reducer.isAddMaster,
		townsArr:state.master_reducer.towns
	}
}
export default connect(mapStateToProps, {addNewMaster, toggleAddMasterForm})(AdminSrcreen);
// <label htmlFor="towns">Choose town</label>
// <select id="towns" multiple>
// 	{
// 		props.townsArr.map((item)=><option key={item}>{item}</option>)
// 	}
// </select>
