import React from 'react';
import {connect} from "react-redux";

import List from "./List";
import ListItem from "./ListItem";

import {deleteClient} from "../../store/adminPanel/actions";
import withOptions from "../../hocs/withOptions";

function ClientsList(props){
  let ListItemWithOptions = withOptions(ListItem, props.deleteClient);
  return <List ListItem = {ListItemWithOptions}
               dataArr={props.clientsArr}
               style = {style}/>
}
let style = {
  width: '100%',
  tableLayout: 'fixed'
}
export default connect(null, {deleteClient})(ClientsList);
