import React from 'react';

export default function DeleteBtn({deleteMasterById, id}){
  return (
    <button onClick={()=>deleteMasterById(id)} className="dropdown-item">
      Delete
    </button>
  );
}
