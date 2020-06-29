import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

import {addCurrentOrderToState, addSuitableMasters, addOrdersToState, addNewOrderToState} from '../../store/clientSide/actions';
import OrderForm from "./OrderForm";
import MastersList from "./MastersList";

import {SERVERDOMAIN} from "../../services/serverUrls";

function ClientSrcreen(props){
	let [townsArr, setTownsArr] = useState([]);
	useEffect(()=>{
		fetch(`${SERVERDOMAIN}/get_towns`)
			.then(json=>json.json())
			.then(data=>setTownsArr(data));
		getOrdersArrFromServer(SERVERDOMAIN);
	}, []);

	function getOrdersArrFromServer(url){
		return fetch(`${SERVERDOMAIN}/get_orders`)
			.then(json=>json.json())
	}

	function createUniqueId(objectsArr){
		if(objectsArr.length === 0){
			return 1;
		}
		let idxsArr = objectsArr.map(item=>item.id);
		idxsArr.sort((a, b)=> a - b);

		if(idxsArr.length === idxsArr[idxsArr.length - 1]){
			console.log(idxsArr.length + 1)
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
	function submitHandlerInListMasters(e){
		e.preventDefault();
		let masterId = e.target.chooseMaster.value;
		if(!masterId){
			alert("Please, choose one!!!");
			return false;
		}
		let newObj = {...props.currentOrder, masterId: masterId, id: createUniqueId(props.ordersArr)};
		fetch(`${SERVERDOMAIN}/post_order`, {
			method: "POST",
			headers:{
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(newObj)
		})
			.catch((err)=>{throw err})
			.then(json=>json.json())
			.then(data=>{
				alert("Congratulations, you have booked a master!!!");
				props.history.push("/client");
				getOrdersArrFromServer(SERVERDOMAIN).then(data=>props.addOrdersToState(data));
				props.addCurrentOrderToState({});
			})
			.catch((err)=>alert(err));
	}
	function getMastersFromServer(clientTown){
		fetch(`${SERVERDOMAIN}/get_masters`)
			.then(json=>json.json())
			.then(data=>{
				let newarr = data.filter(item=>{
					let townsArr = item.towns.split(',');
					if(townsArr.includes(clientTown)){
						return true;
					}else{
						return false;
					}
				});
				props.addSuitableMasters(newarr);
			});
	}
	function submitOrderFormHandler(e){
		e.preventDefault();
		let trgElem = e.target;
		if(!trgElem.town.value || !trgElem.size.value){
			alert("Pleade, filling all gaps!!!");
			return false;
		}
		getMastersFromServer(e.target.town.value);
		props.history.push("/client/masters");
	}


	return (
		<div style={{width: "70%", margin: "0 auto"}} className="mt-4">
			<Switch>
				<Route exact path="/client" render={()=><OrderForm townsArr={townsArr} submitHandler = {submitOrderFormHandler}/>}/>
				<Route path="/client/masters" render={()=><MastersList submitHandler = {submitHandlerInListMasters}/>}/>
			</Switch>
		</div>
	);
}

function mapStateToProps(state){
	return {
		currentOrder: state.client_order_reduser.currentOrder,
		ordersArr: state.client_order_reduser.ordersArr
	}
}
let actions = {
	addOrdersToState,
	addCurrentOrderToState,
	addSuitableMasters,
	addNewOrderToState
}

ClientSrcreen.propTypes = {
	addOrdersToState: PropTypes.func,
	addCurrentOrderToState: PropTypes.func,
	addSuitableMasters: PropTypes.func,
	addNewOrderToState: PropTypes.func,
	currentOrder: PropTypes.object,
	ordersArr: PropTypes.array
}

export default connect(mapStateToProps, actions)(ClientSrcreen);
