import React from 'react';
import {connect} from "react-redux";
import TownItem from "./TownItem";
import {deleteTown} from "../../../store/adminPanel/actions";
import withDeleteBtn from "../../../hocs/withDeleteBtn";


function TownsList({townsArr, deleteTown}){
  let NewComp = withDeleteBtn(TownItem, deleteTown);
  return (
    <table className="table table-dark" style={{width: '20%', margin: '0 auto'}}>
      <thead>
        <tr>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {townsArr.map((item)=><tr key={item}><NewComp item={item} by={item}/></tr>)}
      </tbody>
    </table>
  );
}
export default connect(null, {deleteTown})(TownsList);

//
