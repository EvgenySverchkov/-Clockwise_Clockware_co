import React from 'react';
export default ({name, id})=>{
  return (
    <>
      <th scope="row">{id}</th>
      <td>{name}</td>
    </>
  )
}
