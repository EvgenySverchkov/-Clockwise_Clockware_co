import React from 'react';
import PropTypes from 'prop-types';

import DeleteBtn from "./DeleteBtn";
import LinkToEditForm from "./LinkToEditForm";
import ShowFullInfo from "./ShowFullInfo";

function OptionsBtnsGroup({deleteMasterById, itemObj}){
  return (
    <td className="text-center">
      <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Options
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <DeleteBtn deleteMasterById={deleteMasterById} id={itemObj.id}/>
            <LinkToEditForm id={itemObj.id}/>
            <ShowFullInfo itemObj = {itemObj}/>
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
