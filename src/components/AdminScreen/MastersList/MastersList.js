import React from 'react';
import MasterItem from "./MasterItem";
import {connect} from "react-redux";
import {deleteMaster} from "../../../store/adminPanel/actions";
import withDeleteBtn from "../../../hocs/withDeleteBtn";

function MastersList(props){
  let MasterItemWithDelete = withDeleteBtn(MasterItem, props.deleteMaster);
  return (
    <ul style={{listStyle: "none"}}>{
      props.mastersArr.map((item)=><MasterItemWithDelete key={item.id+1} masterObj = {item} by={item.id}/>)
    }</ul>
  );
}

export default connect(null, {deleteMaster})(MastersList);
