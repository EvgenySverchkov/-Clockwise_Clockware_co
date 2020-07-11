import React from "react";
import PropTypes from "prop-types";

function ListItem({ infoObj, mainRows }) {
  return (
    <>
      {mainRows.map((item) => (
        <td
          className="text-center"
          style={{ wordWrap: "break-word" }}
          key={item}
        >
          {infoObj[item]}
        </td>
      ))}
    </>
  );
}

ListItem.propTypes = {
  infoObj: PropTypes.object,
};

export default ListItem;
