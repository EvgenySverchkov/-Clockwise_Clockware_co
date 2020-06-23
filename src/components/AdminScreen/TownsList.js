import React from 'react';
import {connect} from "react-redux";

import List from "./List";
import ListItem from "./ListItem";

import {deleteTown} from "../../store/adminPanel/actions";
import deleteBtnHoc from "../../hocs/withDeleteBtn";

function TownsList({townsArr, deleteTown}){
  function deleteTownById(townId){
    fetch(`https://clockwiseserver.herokuapp.com/delete_town/${townId}`, {
      method: "delete"
    }).then(data=>data.json())
    .then(data=>deleteTown(data))
  }
  let ListItemWithDelete = deleteBtnHoc(ListItem, deleteTownById);
  return <List ListItem = {ListItemWithDelete}
               dataArr={townsArr}
               style = {style}/>
}
let style = {
  width: '20%',
  margin: '0 auto'
}
export default connect(null, {deleteTown})(TownsList);
