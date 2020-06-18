import React from 'react';

export default ({masterObj})=>{
  return (
    <li>
      <div>Name: {masterObj.name}</div>
      <div>Rating: {masterObj.rating}</div>
      <div>Towns: {masterObj.towns.join(",")}</div>
      <div>Id: {masterObj.id}</div>
    </li>
  );
}
