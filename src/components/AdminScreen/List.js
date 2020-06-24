import React from 'react';

export default function CreateList({ListItem, dataArr, style}){
  function CreateHeaders({dataArr}){
    if(dataArr.length===0){
      return (<tr><th>List is empty</th></tr>)
    }
    let keysArr = Object.keys(dataArr[0]);
    return (
      <tr>
        {
          keysArr.map(item=>{
            let value = item;
            if(typeof item === 'string'){
              let upperChar = item.match(/[A-Z]/);
              let strCopy = item;
              if(upperChar){
                let idx = upperChar.index;
                strCopy = item.slice(0, idx) + " " + item[idx].toLocaleLowerCase() + item.slice(idx+1);
              }
              value = strCopy[0].toUpperCase() + strCopy.slice(1);
            }
            return (<th key={item}>{value}</th>);
          })
        }
        <th></th>
      </tr>
    )
  }
  return (
    <table className="table table-dark" style={style}>
      <thead>
        <CreateHeaders dataArr={dataArr}/>
      </thead>
      <tbody>
        {
          dataArr.map((item)=>(
            <tr key={item.id+1}>
              <ListItem infoObj = {item}/>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
