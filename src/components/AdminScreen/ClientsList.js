import React from 'react';
import {connect} from "react-redux";

import List from "./List";
import ListItem from "./ListItem";

import {deleteClient} from "../../store/adminPanel/actions";
import withDeleteBtn from "../../hocs/withDeleteBtn";

function ClientsList(props){
  let ListItemWithDelete = withDeleteBtn(ListItem, props.deleteClient);
  return <List ListItem = {ListItemWithDelete}
               dataArr={props.clientsArr}
               style = {style}/>
}
let style = {
  width: '100%',
  tableLayout: 'fixed'
}
export default connect(null, {deleteClient})(ClientsList);
