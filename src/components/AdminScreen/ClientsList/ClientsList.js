import React from 'react';
import ClientItem from "./ClientItem";

function ClientsList(props){
  return (
    <ul style={{listStyle: "none"}}>{
      props.clientsArr.map((item)=><ClientItem key={item.id+1} clientObj = {item}/>)
    }</ul>
  );
}

export default ClientsList;
