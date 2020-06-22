import React from 'react';

export default ({masterObj})=>{
  return (
    <>
      <th scope="row">{masterObj.id}</th>
      <td>{masterObj.name}</td>
      <td>{masterObj.rating}</td>
      <td style={{wordWrap: 'break-word'}}>{masterObj.towns}</td>
    </>
  );
}
