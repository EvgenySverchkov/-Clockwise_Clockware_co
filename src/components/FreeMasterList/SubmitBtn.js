import React from 'react';

const SubmitBtn = ({isLoad})=>(
    <div className="form-group float-right mt-3">
        <input
          type="submit"
          value={isLoad ? "Loading..." : "Book now"}
          className="btn btn-primary"
        />
      </div>
);

export default SubmitBtn;