import React, {useEffect} from 'react';
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import {addNewMaster, addNewTown, initMasters,
	      townsInit, updateMasterInState, updateTownInState,
				deleteMasterFromState, deleteTownFromState, initOrders, deleteOrderFromState, updateOrderInState} from "../../store/adminPanel/actions";
import "./adminScreen.css";

import NavMenu from "./NavMenu";
import AddNewTownForm from "./AddNewTownForm";
import AddMasterForm from "./AddMasterForm";
import EditForm from "./EditForm";
import List from "./List";

import {SERVERDOMAIN} from "../../services/serverUrls";

function AdminSrcreen(props){
	useEffect(function(){
		fetch(`${SERVERDOMAIN}/get_masters`)
			.then(data=>data.json())
			.then(data=>props.initMasters(data));

		fetch(`${SERVERDOMAIN}/get_towns`)
			.then(json=>json.json())
			.then(data=>props.townsInit(data));

		fetch(`${SERVERDOMAIN}/get_orders`)
			.then(json=>json.json())
			.then(data=>props.initOrders(data));
	}, []);
	function postData(url, newObj){
		return fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newObj),
		})
		.then(json=>json.json())
		.catch((err)=>{
			alert("Internal Server Error! Try again");
			console.log(err)
			throw err;
		});
	}
	function addNewMasterHandler(e){
			e.preventDefault();
			let masterName = e.target.name.value;
			let masterRating = e.target.rating.value;
			let townsArr = selectCheckedTowns(e.target.elements);
			if(masterName&&masterRating&&townsArr.length!==0){
				if(masterName.match(/\d/)){
					alert("The string name must not contain numbers!!!!")
				}else{
					masterName = masterName.charAt(0).toUpperCase() + masterName.slice(1).toLowerCase();
					let infoObj = {
						id: createUniqueId(props.mastersArr),
						rating: masterRating,
						towns: townsArr.join(","),
						name: masterName,
					};
					postData(`${SERVERDOMAIN}/post_master`, infoObj)
						.then(data=>props.addNewMaster(data))
						.then(()=>{
							alert("You added new master");
							props.history.push('/admin/mastersList');
						})
						.catch((err)=>alert(err));
				}
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
				townName = townName.charAt(0).toUpperCase() + townName.slice(1).toLowerCase();
				let infoObj = {
					name: townName,
					id: createUniqueId(props.townsArr),
				};
				postData(`${SERVERDOMAIN}/post_town`, infoObj)
					.then(data=>{
						props.addNewTown(data)
					})
					.then(()=>{
						alert("You added new town");
						props.history.push('/admin/townsList');
					})
					.catch((err)=>alert(err));
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
		.then(json=>json.json())
		.catch((err)=>{
			alert("Internal Server Error! Try again");
			console.log(err)
			throw err;
		});
	}
	function editMasterHandler(e, newMasterObj){
		e.preventDefault();
		for(let key in newMasterObj){
			if(!newMasterObj[key]){
				alert("Please filling all gaps");
				return false;
			}
		}
		putDataToServer(`${SERVERDOMAIN}/put_master/${newMasterObj.id}`, newMasterObj)
			.then(data=>{
				props.updateMasterInState(data);
				props.history.push('/admin/mastersList');
			}).catch((err)=>alert(err));
	}
	function editTownHandler(e, newTownObj){
		e.preventDefault();
		for(let key in newTownObj){
			if(!newTownObj[key]){
				alert("Please filling all gaps");
				return false;
			}
		}
		if(props.townsArr.find((item)=>item.name.toLowerCase()===newTownObj.name.toLowerCase())){
			alert("The name of this town is already on the list! \nPlease enter another town name!");
		}else{
			putDataToServer(`${SERVERDOMAIN}/put_town/${newTownObj.id}`, newTownObj)
				.then(data=>{
					props.updateTownInState(data);
					props.history.push('/admin/townsList');
				}).catch((err)=>alert(err));
		}
	}
	function editOrderHandler(e, newOrderObj){
		e.preventDefault();
		for(let key in newOrderObj){
			if(!newOrderObj[key]){
				alert("Please filling all gaps");
				return false;
			}
		}
		putDataToServer(`${SERVERDOMAIN}/put_order/${newOrderObj.id}`, newOrderObj)
			.then(data=>{
				props.updateOrderInState(data);
				props.history.push('/admin/ordersList')
			}).catch((err)=>alert(err));
	}

	function createUniqueId(objectsArr){
		if(objectsArr.length === 0){
			return 1;
		}
		let idxsArr = objectsArr.map(item=>item.id);
		idxsArr.sort((a, b)=> a - b);
	  if(idxsArr.length === idxsArr[idxsArr.length - 1]){
	    return idxsArr.length + 1;
	  }else{
	    let resultLength = idxsArr[idxsArr.length - 1] + 1;
	    for (let i = 1; i < resultLength; i++){
	      if (idxsArr.indexOf(i) === -1){
	        return i;
	      }
	    }
	  }
	}

	function deleteDataFromServer(url){
		return fetch(url, {
			method: "delete"
		})
		.then(data=>data.json())
		.catch((err)=>{
			alert("Internal Server Error! Try again");
			console.log(err)
			throw err;
		});
	}
	function deleteMasterById(masterId){
		deleteDataFromServer(`${SERVERDOMAIN}/delete_master/${masterId}`)
		.then(data=>props.deleteMasterFromState(data)).catch((err)=>alert(err));
	}
	function deleteTownById(townId){
		deleteDataFromServer(`${SERVERDOMAIN}/delete_town/${townId}`)
		.then(data=>props.deleteTownFromState(data)).catch((err)=>alert(err));
	}
	function deleteOrderById(orderId){
		deleteDataFromServer(`${SERVERDOMAIN}/delete_order/${orderId}`)
		.then(data=>props.deleteOrderFromState(data)).catch((err)=>alert(err));
	}

	return(
		<div className="container">
			<NavMenu />
			<div className="content">
				<Switch>
					<Route path="/admin/ordersList"
								 render={()=><List dataArr={props.ordersArr}
							                		 style = {{width: '100%', tableLayout: 'fixed'}}
							                     deleteAction = {deleteOrderById}/>}/>
					<Route path="/admin/mastersList"
								 render={()=><List dataArr={props.mastersArr}
							                		 style = {{width: '70%',margin: '0 auto', tableLayout: 'fixed'}}
							                     deleteAction = {deleteMasterById}/>}/>
					<Route path="/admin/townsList"
								 render={()=><List dataArr={props.townsArr}
								 									 style = {{width: '40%', margin: '0 auto', tableLayout: 'fixed'}}
								 									 deleteAction = {deleteTownById}/>}/>
					<Route path="/admin/addMasterForm"
						     render={()=><AddMasterForm townsArr={props.townsArr} handler={addNewMasterHandler}/>}/>
					<Route path="/admin/addTownForms"
				 			 	 render={()=><AddNewTownForm handler={addNewTownHandler}/>}/>
					<Route path="/admin/editMaster/:id"
								 render={(matchProps)=> (
									 <EditForm id = {+matchProps.match.params.id}
									 					 handler={editMasterHandler}
														 arrFromState={props.mastersArr}/>
								 )}/>
				  <Route path="/admin/editTown/:id"
								 render={(matchProps)=> (
									 <EditForm id = {+matchProps.match.params.id}
														 handler={editTownHandler}
														 arrFromState={props.townsArr}/>
								 )}/>
							 <Route path="/admin/editOrder/:id"
								 render={(matchProps)=> (
			 							<EditForm id = {+matchProps.match.params.id}
			 												handler={editOrderHandler}
			 												arrFromState={props.ordersArr}/>
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
		ordersArr: state.orders_reducer.ordersArr,
	}
}
const actions = {
	addNewMaster,
	addNewTown,
	initMasters,
	townsInit,
	updateMasterInState,
	updateTownInState,
	deleteMasterFromState,
	deleteTownFromState,
	initOrders,
	deleteOrderFromState,
	updateOrderInState
}

AdminSrcreen.propTypes = {
	addNewMaster: PropTypes.func,
	addNewTown: PropTypes.func,
	initMasters: PropTypes.func,
	townsInit: PropTypes.func,
	updateMasterInState: PropTypes.func,
	updateTownInState: PropTypes.func,
	deleteMasterFromState: PropTypes.func,
	deleteTownFromState: PropTypes.func,
	initOrders: PropTypes.func,
	deleteOrderFromState: PropTypes.func,
	updateOrderInState: PropTypes.func,
	mastersArr: PropTypes.array,
	townsArr: PropTypes.array,
	ordersArr: PropTypes.array,
}

export default connect(mapStateToProps, actions)(AdminSrcreen);
