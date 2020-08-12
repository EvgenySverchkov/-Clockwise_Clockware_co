import React from 'react';

const WarningModal = ({data}) => {
  return (
    <div className="modal fade" id="warningModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
        <h4 className="modal-title display-4 text-warning" id="warningModalLabel">
          Warning <span className = "display-4">&#9888;</span>
        </h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          {data.msg || null}
      </div>
      <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Ok</button>
      </div>
        </div>
        </div>
    </div>
    );
}

export default WarningModal;