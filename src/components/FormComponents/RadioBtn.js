import React from "react";

export default ({id, value, name, chngHandler, children})=>(
    <div className="form-check form-check-inline">
        <input
            className="form-check-input"
            type="radio"
            onChange={chngHandler||null}
            name={name}
            id={id}
            value={value}
        />
        {children}
</div>
);