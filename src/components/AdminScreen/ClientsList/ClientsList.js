import React from 'react';
import ClientItem from "./ClientItem";
import {connect} from "react-redux";
import {deleteClient} from "../../../store/adminPanel/actions";
import withDeleteBtn from "../../../hocs/withDeleteBtn";

function ClientsList(props){
  let ClientItemWithDelete = withDeleteBtn(ClientItem, props.deleteClient);
  return (
    <ul style={{listStyle: "none"}}>{
      props.clientsArr.map((item)=><ClientItemWithDelete key={item.id+1} clientObj = {item} by={item.id}/>)
    }</ul>
  );
}

export default connect(null, {deleteClient})(ClientsList);
