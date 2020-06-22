import React from 'react';
import {connect} from "react-redux";
import TownItem from "./TownItem";
import {deleteTown} from "../../../store/adminPanel/actions";
import withDeleteBtn from "../../../hocs/withDeleteBtn";

function TownsList({townsArr, deleteTown}){
  function deleteTownById(townId){
    fetch(`https://clockwiseserver.herokuapp.com/delete_town/${townId}`, {
      method: "delete"
    }).then(data=>data.json())
    .then(data=>deleteTown(data))
  }
  let TownsItemWithDeleteBtn = withDeleteBtn(TownItem, deleteTownById);
  return (
    <table className="table table-dark" style={{width: '20%', margin: '0 auto'}}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        {townsArr.map((item)=><tr key={item.id+1}>
                                <TownsItemWithDeleteBtn name={item.name} by={item.id} id={item.id}/>
                              </tr>)}
      </tbody>
    </table>
  );
}
export default connect(null, {deleteTown})(TownsList);
