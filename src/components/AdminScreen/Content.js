import React from 'react';
import MastersList from "./MastersList";
import AddMasterForm from "./AddMasterForm";
import ClientsList from "./ClientsList";
import AddNewTownForm from "./AddNewTownForm";
import TownsList from "./TownsList";

function Content({toggleAddMasterForm, toggleShowMasterList, toggleShowClientsList, toogleAddTownForm, toggleShowTownList}){
  return(
    <div className="itemsList">
      {toggleAddMasterForm(AddMasterForm)}
      {toggleShowMasterList(MastersList)}
      {toggleShowClientsList(ClientsList)}
      {toogleAddTownForm(AddNewTownForm)}
      {toggleShowTownList(TownsList)}
    </div>
  );
}

export default Content;
