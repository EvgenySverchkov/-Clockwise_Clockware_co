import React from 'react';

export default ({infoObj})=>{
  let keysArr = Object.keys(infoObj);
  return (
    <>
      {
        keysArr.map((item)=><td key={item}>{infoObj[item]}</td>)
      }
    </>
  );
}
