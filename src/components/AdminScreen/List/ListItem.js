import React from 'react';
import PropTypes from 'prop-types';

function ListItem({infoObj}){
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

ListItem.propTypes = {
  infoObj: PropTypes.object
}

export default ListItem;
