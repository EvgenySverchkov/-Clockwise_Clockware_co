import React from 'react';

import MasterItem from "./MasterItem";
import {connect} from "react-redux";
import {deleteMaster} from "../../../store/adminPanel/actions";
import withDeleteBtn from "../../../hocs/withDeleteBtn";

function MastersList(props){
  function deleteMasterById(masterId){
    fetch(`https://clockwiseserver.herokuapp.com/delete_master/${masterId}`, {
      method: "delete"
    }).then(data=>data.json())
    .then(data=>props.deleteMaster(data))
  }
  let MasterItemWithDelete = withDeleteBtn(MasterItem, deleteMasterById);
  return (
    <table className="table table-dark" style={{width: '70%', margin: '0 auto', tableLayout: 'fixed'}}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Rating</th>
          <th scope="col">Towns</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {props.mastersArr.map((item)=><tr key={item.id+1}><MasterItemWithDelete masterObj = {item} by={item.id}/></tr>)}
      </tbody>
    </table>
  );
}
export default connect(null, {deleteMaster})(MastersList);
