import React from 'react';

export default ({clientObj})=>{
  return (
    <li>
      <div>Name: {clientObj.name}</div>
      <div>email: {clientObj.email}</div>
      <div>clockSize: {clientObj.clockSize}</div>
      <div>Town: {clientObj.town}</div>
      <div>Time: {clientObj.time}</div>
      <div>Id: {clientObj.id}</div>
    </li>
  );
}
