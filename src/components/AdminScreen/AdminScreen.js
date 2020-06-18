import React from 'react';
import {connect} from "react-redux";
import {addNewMaster, toggleAddMasterForm, toggleShowMasterList} from "../../store/actions";

import Sidebar from "./Sidebar";
import MastersList from "./MastersList";
import Content from "./Content";
import AddMasterForm from "./AddMasterForm";

function AdminSrcreen(props){
	function toggleAddMasterForm(){
			if(props.isAddMasterForm){
				return <AddMasterForm handler={submitHandler} townsArr={props.townsArr}/>;
			}
			function submitHandler(e){
				e.preventDefault();
				let masterName = e.target.name.value;
				let masterRating = e.target.rating.value;
				if(masterName||masterRating){
					let infoObj = {
						name: e.target.name.value,
						rating: e.target.rating.value,
						id: createUniqueId(),
						towns: selectCheckedTowns(e.target.elements)
					}
					props.addNewMaster(infoObj);
					props.toggleAddMasterForm(false);
					props.toggleShowMasterList(true);
					alert("You added new master")
				}else{
					alert("Please, feeling all gaps")
				}
			}
			function createUniqueId(){
				if(props.mastersArr.length === 0){
					return 1;
				}else{
					let copyArr = [...props.mastersArr];
					let sortArr = copyArr.sort((firstItem,secondItem)=>firstItem.id - secondItem.id);
					return sortArr[sortArr.length-1].id + 1;
				}
			}
			function selectCheckedTowns(elements){
				let newArr = Array.from(elements);
				let towns = [];
				newArr.forEach((item)=>{
					if(item.className==='towns'){
						if(item.checked){
							towns.push(item.value)
						}
					}
				})
				return towns;
			}
	}
	function toggleShowMasterList(){
		if(props.isMasterList){
			return <MastersList mastersArr = {props.mastersArr} />
		}
	}

	return(
		<div style={style}>
			<Sidebar />
			<Content toggleAddMasterForm={toggleAddMasterForm}
							 toggleShowMasterList={toggleShowMasterList}/>
		</div>
	);
}
const style={
	display: "grid",
	gridTemplateColumns: "25% 75%"
}
function mapStateToProps(state){
	return {
		mastersArr: state.master_reducer.masters,
		isAddMasterForm: state.master_reducer.isAddMaster,
		townsArr:state.master_reducer.towns,
		isMasterList: state.master_reducer.isMasterList
	}
}
export default connect(mapStateToProps, {addNewMaster, toggleAddMasterForm, toggleShowMasterList})(AdminSrcreen);
