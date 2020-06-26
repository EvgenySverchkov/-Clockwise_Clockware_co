import React from 'react';

export default ({infoObj})=>{
  let keysArr = Object.keys(infoObj);
  return (
    <>
      {
        keysArr.map((item)=><td className="text-center"
                                style={{wordWrap: "break-word"}}
                                key={item}>{infoObj[item]}</td>)
      }
    </>
  );
}
