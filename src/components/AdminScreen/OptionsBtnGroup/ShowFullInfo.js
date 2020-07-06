import React from 'react';
import {connect} from "react-redux";
import {chngCurrItemForModal} from "../../../store/adminPanel/actions";

function ShowFullInfo({itemObj, chngCurrItemForModal}){
  return (
    <button onClick={()=>{chngCurrItemForModal(itemObj)}} type="button" className="dropdown-item" data-toggle="modal" data-target="#fullInfoModal">
      Show full info
    </button>
  );
}

export default connect(null, {chngCurrItemForModal})(ShowFullInfo);
