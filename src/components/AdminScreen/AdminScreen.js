import React, {useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {addNewMaster, addNewTown, initMasters} from "../../store/adminPanel/actions";
import "./adminScreen.css";

import Sidebar from "./Sidebar";
import ClientsList from "./ClientsList";
import MastersList from "./MastersList";
import TownsList from "./TownsList";
import AddNewTownForm from "./AddNewTownForm";
import AddMasterForm from "./AddMasterForm";

function AdminSrcreen(props){
	useEffect(function(){
		fetch("https://clockwiseserver.herokuapp.com/get_masters")
		.then(data=>data.json())
		.then(data=>props.initMasters(data))
	}, []);
	function addNewMasterHandler(e){
			e.preventDefault();
			let masterName = e.target.name.value;
			let masterRating = e.target.rating.value;
			let townsArr = selectCheckedTowns(e.target.elements);
			if(masterName&&masterRating&&townsArr.length!==0){
				let infoObj = {
					id: createUniqueId(),
					name: masterName,
					rating: masterRating,
					towns: townsArr.join(",")
				};
				let strObj = JSON.stringify(infoObj);
				fetch("https://clockwiseserver.herokuapp.com/post_master", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: strObj,
				})
				.then(json=>json.json())
				.then(data=>props.addNewMaster(data));

				alert("You added new master");
				props.history.push('/admin/mastersList');
			}else{
				alert("Please, feeling all gaps")
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
					if(item.className.match(/\btowns\b/)){
						if(item.checked){
							towns.push(item.value)
						}
					}
				})
				return towns;
		}
	}
	function addNewTownHandler(e){
		e.preventDefault();
		let townName = e.target.town.value;
		if(townName){
			if(props.townsArr.includes(townName)){
				alert("The name of this town is already on the list! \nPlease enter another town name!");
			}else{
				props.addNewTown(townName);
				alert("You added new town");
				props.history.push('/admin/townsList');
			}
		}else{
			alert("Please, filling the gap")
		}
}
return(
	<div className="container">
		<Sidebar/>
		<div className="content">
			<Switch>
				<Route path="/admin/clientsList"
							 render={()=><ClientsList clientsArr={props.clientsArr}/>}/>
				<Route path="/admin/mastersList"
							 render={()=><MastersList mastersArr={props.mastersArr}/>}/>
				<Route path="/admin/addMasterForm"
					     render={()=><AddMasterForm townsArr={props.townsArr} handler={addNewMasterHandler}/>}/>
				<Route path="/admin/townsList"
			 				 render={()=><TownsList townsArr={props.townsArr}/>}/>
				<Route path="/admin/addTownForms"
			 			 	 render={()=><AddNewTownForm handler={addNewTownHandler}/>}/>
			</Switch>
		</div>
	</div>
	);
}

function mapStateToProps(state){
	return {
		mastersArr: state.master_reducer.masters,
		townsArr:state.town_reduser.towns,
		clientsArr: state.client_reduser.clients,
	}
}
let actions = {
	addNewMaster,
	addNewTown,
	initMasters
}
export default connect(mapStateToProps, actions)(AdminSrcreen);
