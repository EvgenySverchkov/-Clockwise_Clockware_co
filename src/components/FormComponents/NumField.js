import React from "react";

export default ({max, min, id})=>(
    <div className="col-sm-3">
          <input
            id={id}
            className="form-control"
            type="number"
            min={min}
            max={max}
          />
        </div>
);