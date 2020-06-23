import React from 'react';
import {connect} from "react-redux";

import List from "./List";
import ListItem from "./ListItem";

import {deleteMaster} from "../../store/adminPanel/actions";
import withDeleteBtn from "../../hocs/withDeleteBtn";

function MastersList(props){
  function deleteMasterById(masterId){
    fetch(`https://clockwiseserver.herokuapp.com/delete_master/${masterId}`, {
      method: "delete"
    }).then(data=>data.json())
    .then(data=>props.deleteMaster(data))
  }
  let ListItemWithDelete = withDeleteBtn(ListItem, deleteMasterById);
  return <List ListItem = {ListItemWithDelete}
               dataArr={props.mastersArr}
               style = {style}/>
}
let style = {
  width: '70%',
  margin: '0 auto',
  tableLayout: 'fixed'
}

export default connect(null, {deleteMaster})(MastersList);
