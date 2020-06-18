import React from 'react';

function Content({toggleAddMasterForm, toggleShowMasterList}){
  return(
    <div className="itemsList">
      {toggleAddMasterForm()}
      {toggleShowMasterList()}
    </div>
  );
}

export default Content;
