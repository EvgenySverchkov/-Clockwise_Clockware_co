import React from 'react';
import {connect} from "react-redux";
import TownItem from "./TownItem";
import {deleteTown} from "../../../store/adminPanel/actions";
import withDeleteBtn from "../../../hocs/withDeleteBtn";


function TownsList({townsArr, deleteTown}){
  let NewComp = withDeleteBtn(TownItem, deleteTown);
  return (
    <ul>
      {townsArr.map((item)=><NewComp key={item} item={item} by={item}/>)}
    </ul>
  );
}
export default connect(null, {deleteTown})(TownsList);
