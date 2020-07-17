import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function EditForm({ id, handler, arrFromState, editFormIsLoad }) {
  let obj = arrFromState.find((item) => item.id === id);
  let [stateObj, setStateObj] = useState(obj);
  let keyArr = Object.keys(stateObj || {});

  function changeValue(e) {
    setStateObj({ ...stateObj, [e.target.id]: e.target.value });
  }
  return (
    <form onSubmit={(e) => handler(e, stateObj)}>
      {keyArr.map((item) => {
        if (item === "id") {
          return null;
        } else {
          return (
            <div
              key={item}
              className="form-group row justify-content-sm-center"
            >
              <label htmlFor={item} className="col-sm-3 col-form-label">
                Enter {item}
              </label>
              <div className="col-sm-5">
                {item === "rating" ? (
                  <input
                    id={item}
                    className="form-control"
                    type="number"
                    min="0"
                    max="5"
                    value={stateObj[item] || ""}
                    onChange={changeValue}
                  />
                ) : (
                  <input
                    id={item}
                    className="form-control"
                    value={stateObj[item] || ""}
                    onChange={changeValue}
                  />
                )}
              </div>
            </div>
          );
        }
      })}
      <div className="row justify-content-sm-center">
        <input
          type="submit"
          value={editFormIsLoad ? "Loading..." : "Edit"}
          className="btn btn-primary col-12 col-sm-4 mt-3"
        />
      </div>
    </form>
  );
}

EditForm.propTypes = {
  id: PropTypes.number,
  handler: PropTypes.func,
  arrFromState: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    editFormIsLoad: state.main_adminPanel_reduser.editFormIsLoad,
  };
}

export default connect(mapStateToProps)(EditForm);
