import React from "react";
import PropTypes from "prop-types";

function FullInfoModal({ itemObj }) {
  return (
    <div
      className="modal fade"
      id="fullInfoModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Full info
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {Object.keys(itemObj).map((key) => {
              return (
                <div key={key}>
                  {key}: <span>{itemObj[key]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullInfoModal;
