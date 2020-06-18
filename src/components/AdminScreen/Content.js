import React from 'react';
import MastersList from "./MastersList";
import AddMasterForm from "./AddMasterForm";
import ClientsList from "./ClientsList";
import AddNewTownForm from "./AddNewTownForm";

function Content({toggleAddMasterForm, toggleShowMasterList, toggleShowClientsList, toogleAddTownForm}){
  return(
    <div className="itemsList">
      {toggleAddMasterForm(AddMasterForm)}
      {toggleShowMasterList(MastersList)}
      {toggleShowClientsList(ClientsList)}
      {toogleAddTownForm(AddNewTownForm)}
    </div>
  );
}

export default Content;
