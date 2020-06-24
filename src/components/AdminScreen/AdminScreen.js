import React, {useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {addNewMaster, addNewTown, initMasters, townsInit, updateMaster, updateTown} from "../../store/adminPanel/actions";
import "./adminScreen.css";

import Sidebar from "./Sidebar";
import ClientsList from "./ClientsList";

import MastersList from "./MastersList";
import TownsList from "./TownsList";
import AddNewTownForm from "./AddNewTownForm";
import AddMasterForm from "./AddMasterForm";
import EditForm from "./EditForm";

import {serverDomain} from "../../services/serverUrls";

function AdminSrcreen(props){
	useEffect(function(){
		fetch("https://clockwiseserver.herokuapp.com/get_masters")
			.then(data=>data.json())
			.then(data=>props.initMasters(data));

		fetch("https://clockwiseserver.herokuapp.com/get_towns")
			.then(json=>json.json())
			.then(data=>props.townsInit(data));
	}, []);
	function postData(url, newObj){
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newObj),
		}).then(json=>json.json());
	}
	function addNewMasterHandler(e){
			e.preventDefault();
			let masterName = e.target.name.value;
			let masterRating = e.target.rating.value;
			let townsArr = selectCheckedTowns(e.target.elements);
			if(masterName&&masterRating&&townsArr.length!==0){
				let infoObj = {
					id: createUniqueId(props.mastersArr),
					name: masterName,
					rating: masterRating,
					towns: townsArr.join(",")
				};
				postData(`${serverDomain}/post_master`, infoObj)
					.then(data=>props.addNewMaster(data))
					.then(()=>{
						alert("You added new master");
						props.history.push('/admin/mastersList');
					});
			}else{
				alert("Please, feeling all gaps")
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
				});
				return towns;
		}
	}
	function addNewTownHandler(e){
		e.preventDefault();
		let townName = e.target.town.value;
		if(townName){
			if(props.townsArr.find((item)=>item.name.toLowerCase()===townName.toLowerCase())){
				alert("The name of this town is already on the list! \nPlease enter another town name!");
				e.target.town.value = '';
			}else{
				let infoObj = {
					id: createUniqueId(props.townsArr),
					name: townName
				};
				postData("${serverDomain}/post_town", infoObj)
					.then(data=>{
						props.addNewTown(data)
					})
					.then(()=>{
						alert("You added new town");
						props.history.push('/admin/townsList');
					});
				}
			}else{
				alert("Please, filling the gap")
			}
	}

	function putDataToServer(url, newObj){
		return fetch(url, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newObj)
		})
		.then(json=>json.json());
	}
	function editMasterHandler(e, newMasterObj){
		e.preventDefault();
		putDataToServer(`${serverDomain}/put_master/${newMasterObj.id}`, newMasterObj)
			.then(data=>{
				props.updateMaster(data);
				props.history.push('/admin/mastersList');
			});
	}
	function editTownHandler(e, newTownObj){
		e.preventDefault();
		putDataToServer(`${serverDomain}/put_town/${newTownObj.id}`, newTownObj)
			.then(data=>{
				props.updateTown(data);
				props.history.push('/admin/townsList');
			});
	}

	function createUniqueId(arr){
		if(arr.length === 0){
			return 1;
		}else{
			let copyArr = [...arr];
			let sortArr = copyArr.sort((firstItem,secondItem)=>firstItem.id - secondItem.id);
			return sortArr[sortArr.length-1].id + 1;
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
					<Route path="/admin/editMaster/:id"
								 render={(matchProps)=> (
									 <EditForm id = {matchProps.match.params.id}
									 					 handler={editMasterHandler}
														 arrFromState={props.mastersArr}/>
								 )}/>
				  <Route path="/admin/editTowns/:id"
								 render={(matchProps)=> (
									 <EditForm id = {matchProps.match.params.id}
														 handler={editTownHandler}
														 arrFromState={props.townsArr}/>
								 )}/>
				</Switch>
			</div>
		</div>
		);
}

function mapStateToProps(state){
	return {
		mastersArr: state.master_reducer.masters,
		townsArr: state.town_reduser.towns,
		clientsArr: state.client_reduser.clients,
	}
}
let actions = {
	addNewMaster,
	addNewTown,
	initMasters,
	townsInit,
	updateMaster,
	updateTown
}
export default connect(mapStateToProps, actions)(AdminSrcreen);
