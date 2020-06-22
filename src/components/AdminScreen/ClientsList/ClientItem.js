import React from 'react';

export default ({clientObj})=>{
  return (
    <>
      <th scope="row">{clientObj.id}</th>
      <td>{clientObj.name}</td>
      <td>{clientObj.email}</td>
      <td>{clientObj.clockSize}</td>
      <td style={{wordWrap:'break-word'}}>{clientObj.town}</td>
      <td>{clientObj.time}</td>
    </>
  );
}
