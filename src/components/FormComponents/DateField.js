import React from "react";

export default ({min, chngHandler, value, name})=>(
    <input
        type="date"
        name={name}
        min={min}
        className="mr-1"
        onChange={chngHandler}
        value={value}
        required
    />
);