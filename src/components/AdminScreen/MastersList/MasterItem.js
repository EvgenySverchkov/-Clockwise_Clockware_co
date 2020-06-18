import React from 'react';

export default ({masterObj})=>{
  return (
    <li key={masterObj.id+1}>
      <div>Name: {masterObj.name}</div>
      <div>Rating: {masterObj.rating}</div>
      <div>Id: {masterObj.id}</div>
    </li>
  );
}
