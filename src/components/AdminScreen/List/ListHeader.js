import React from 'react';

export default function ListHeader({templObj}){
  let keysArr = Object.keys(templObj||{});
  if(keysArr.length===0){
    return (<tr><th>List is empty</th></tr>)
  }
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
          return (<th key={item} className="text-center" style={{wordWrap: "break-word"}}>{value}</th>);
        })
      }
      <th></th>
    </tr>
  )
}
