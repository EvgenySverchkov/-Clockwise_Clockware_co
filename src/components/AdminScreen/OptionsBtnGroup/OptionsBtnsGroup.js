import React from 'react';
import PropTypes from 'prop-types';

import DeleteBtn from "./DeleteBtn";
import LinkToEditForm from "./LinkToEditForm";

function OptionsBtnsGroup({deleteMasterById, itemId}){
  return (
    <td className="text-center">
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

OptionsBtnsGroup.propTypes = {
  deleteMasterById: PropTypes.func,
  itemId: PropTypes.number
}

export default OptionsBtnsGroup;
