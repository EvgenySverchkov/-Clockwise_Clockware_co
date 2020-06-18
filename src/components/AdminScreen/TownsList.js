import React from 'react';

function TownsList({townsArr}){
  return (
    <ul>
      {townsArr.map((item)=><li key={item}>{item}</li>)}
    </ul>
  );
}
export default TownsList;
