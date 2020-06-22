import React from 'react';

import ClientItem from "./ClientItem";
import {connect} from "react-redux";
import {deleteClient} from "../../../store/adminPanel/actions";
import withDeleteBtn from "../../../hocs/withDeleteBtn";

function ClientsList(props){
  let ClientItemWithDelete = withDeleteBtn(ClientItem, props.deleteClient);
  return (
    <table className="table table-dark" style={{width: '100%', tableLayout: 'fixed'}}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">E-mail</th>
          <th scope="col">Clock size</th>
          <th scope="col">Town</th>
          <th scope="col">Time</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {props.clientsArr.map((item)=><tr key={item.id+1}><ClientItemWithDelete clientObj = {item} by={item.id}/></tr>)}
      </tbody>
    </table>
  );
}

export default connect(null, {deleteClient})(ClientsList);

// <ul>{
//   props.clientsArr.map((item)=><ClientItemWithDelete key={item.id+1} clientObj = {item} by={item.id}/>)
// }</ul>
