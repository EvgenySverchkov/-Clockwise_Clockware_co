import React from "react";

const SuccessModal = ({ history, data }) => {
  return (
    <div
      className="modal fade"
      id="successModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4
              className="modal-title display-4 text-success"
              id="successModalLabel"
            >
              Success <span className="display-4">&#10003;</span>
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{data.msg || null}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                history.push(data.backTo);
              }}
            >
              {data.backBtnTxt || null}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
