import React from 'react';
import OptionsBtns from '../OptionsBtnGroup';
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";

export default function CreateList({dataArr, style, deleteAction}){

  return (
    <table className="table table-dark" style={style}>
      <thead>
        <ListHeader templObj={dataArr[0]}/>
      </thead>
      <tbody>
        {
          dataArr.map((item)=>(
            <tr key={item.id+1}>
              <ListItem infoObj = {item}/>
              <OptionsBtns deleteMasterById={deleteAction} itemId={item.id}/>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
