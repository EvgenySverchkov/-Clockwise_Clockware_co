import React, { useEffect } from "react";
import PropTypes from "prop-types";

import OptionsBtns from "../OptionsBtnGroup";
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";

function CreateList({
  dataArr,
  deleteAction,
  mainRows,
  getData,
  history,
  listIsLoad,
}) {
  useEffect(
    function () {
      getData();
    },
    [history.location]
  );
  return (
    <div
      className="table-responsive"
      style={{ overflowY: "auto", height: "80vh" }}
    >
      <table className="table table-dark">
        <thead>
          {listIsLoad ? (
            <tr>
              <th>Loading...</th>
            </tr>
          ) : dataArr.length === 0 ? (
            <tr>
              <th>List is empty</th>
            </tr>
          ) : (
            <ListHeader templArr={mainRows} />
          )}
        </thead>
        <tbody>
          {dataArr.map((item) => (
            <tr key={item.id}>
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
