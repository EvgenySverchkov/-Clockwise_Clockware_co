import React from "react";
import PropTypes from "prop-types";

import OptionsBtns from "../OptionsBtnGroup";
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";

function CreateList({ dataArr, style, deleteAction, mainRows }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark">
        <thead>
          <ListHeader templArr={mainRows} />
        </thead>
        <tbody>
          {dataArr.map((item) => (
            <tr key={item.id + 1}>
              <ListItem infoObj={item} mainRows={mainRows} />
              <OptionsBtns deleteMasterById={deleteAction} itemObj={item} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
CreateList.propTypes = {
  dataArr: PropTypes.array,
  style: PropTypes.object,
  deleteAction: PropTypes.func,
};

export default CreateList;
