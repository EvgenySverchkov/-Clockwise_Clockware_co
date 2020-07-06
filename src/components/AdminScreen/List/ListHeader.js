import React from 'react';
import PropTypes from 'prop-types';

function ListHeader({templArr}){
  return (
    <tr>
      {
        templArr.map(item=>{
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
ListHeader.propTypes = {
  templObj: PropTypes.object
}
export default ListHeader;
