import React from 'react';
import {connect} from "react-redux";

import List from "./List";
import ListItem from "./ListItem";

import {deleteTown} from "../../store/adminPanel/actions";
import withOptions from "../../hocs/withOptions";

import {serverDomain} from "../../services/serverUrls";

function TownsList(props){
  function deleteTownById(townId){
    fetch(`${serverDomain}/delete_town/${townId}`, {
      method: "delete"
    }).then(data=>data.json())
    .then(data=>props.deleteTown(data))
  }
  ListItem.displayName = "TownItem";
  let ListItemWithOptions = withOptions(ListItem, deleteTownById);
  return <List ListItem = {ListItemWithOptions}
               dataArr={props.townsArr}
               style = {style}/>
}
let style = {
  width: '20%',
  margin: '0 auto'
}
export default connect(null, {deleteTown})(TownsList);
