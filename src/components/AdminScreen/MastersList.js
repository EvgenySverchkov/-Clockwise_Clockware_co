import React from 'react';
import {connect} from "react-redux";

import List from "./List";
import ListItem from "./ListItem";

import {deleteMaster} from "../../store/adminPanel/actions";
import withOptions from "../../hocs/withOptions";

import {serverDomain} from "../../services/serverUrls";

function MastersList(props){
  function deleteMasterById(masterId){
    fetch(`${serverDomain}/delete_master/${masterId}`, {
      method: "delete"
    }).then(data=>data.json())
    .then(data=>props.deleteMaster(data))
  }
  ListItem.displayName = "MasterItem";
  let ListItemWithOptions = withOptions(ListItem, deleteMasterById);
  return <List ListItem = {ListItemWithOptions}
               dataArr={props.mastersArr}
               style = {style}/>
}
let style = {
  width: '70%',
  margin: '0 auto',
  tableLayout: 'fixed'
}

export default connect(null, {deleteMaster})(MastersList);
