import React from 'react';
import {connect} from "react-redux";
import {addNewMaster, toggleAddMasterForm, toggleShowMasterList, toogleAddTownForm, addNewTown, toggleShowTownList} from "../../store/adminPanel/actions";

import Sidebar from "./Sidebar";
import Content from "./Content";

function AdminSrcreen(props){
	function toggleAddMasterForm(Component){
			if(props.isAddMasterForm){
				return <Component handler={submitHandler} townsArr={props.townsArr}/>;
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
	function toggleShowMasterList(Component){
		if(props.isMasterList){
			return <Component mastersArr = {props.mastersArr} />
		}
	}
	function toggleShowClientsList(Component){
		if(props.isShowClientsList){
			return <Component clientsArr = {props.clientsArr} />
		}
	}
	function toogleAddTownForm(Component){
		if(props.isShowAddTownForm){
			return <Component handler={submitHandler}/>;
		}
		function submitHandler(e){
			e.preventDefault();
			let townName = e.target.town.value;
			if(townName){
				if(props.townsArr.includes(townName)){
					alert("The name of this town is already on the list! \nPlease enter another town name!");
				}else{
					props.addNewTown(townName);
					alert("You added new town");
					e.target.town.value = "";
				}
			}else{
				alert("Please, filling the gap")
			}
		}
	}
	function toggleShowTownList(Component){
		if(props.isTownList){
			return <Component townsArr = {props.townsArr}/>
		}
	}

	return(
		<div style={style}>
			<Sidebar />
			<Content toggleAddMasterForm={toggleAddMasterForm}
							 toggleShowMasterList={toggleShowMasterList}
							 toggleShowClientsList={toggleShowClientsList}
							 toogleAddTownForm={toogleAddTownForm}
							 toggleShowTownList={toggleShowTownList}/>
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
		townsArr:state.town_reduser.towns,
		isMasterList: state.master_reducer.isMasterList,
		isShowClientsList: state.client_reduser.isShowClientsList,
		clientsArr: state.client_reduser.clients,
		isShowAddTownForm: state.town_reduser.isShowAddTownForm,
		isTownList: state.town_reduser.isTownList
	}
}
let actions = {
	addNewMaster,
	toggleAddMasterForm,
	toggleShowMasterList,
	toogleAddTownForm,
	addNewTown,
	toggleShowTownList
}
export default connect(mapStateToProps, actions)(AdminSrcreen);
