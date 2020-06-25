import React from 'react';

import DeleteBtn from "./DeleteBtn";
import LinkToEditForm from "./LinkToEditForm";

export default function OptionsBtnsGroup({deleteMasterById, itemId}){
  return (
    <td>
      <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Options
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <DeleteBtn deleteMasterById={deleteMasterById} id={itemId}/>
            <LinkToEditForm id={itemId}/>
          </div>
      </div>
    </td>
  );
}
