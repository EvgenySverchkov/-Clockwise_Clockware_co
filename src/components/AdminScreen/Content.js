import React from 'react';
import MastersList from "./MastersList";
import AddMasterForm from "./AddMasterForm";

function Content({toggleAddMasterForm, toggleShowMasterList}){
  return(
    <div className="itemsList">
      {toggleAddMasterForm(AddMasterForm)}
      {toggleShowMasterList(MastersList)}
    </div>
  );
}

export default Content;
