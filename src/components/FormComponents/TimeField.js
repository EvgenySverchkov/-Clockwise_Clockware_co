import React from "react";

export default ({name, max, min, chngHandler, value})=>(
    <input
        type="time"
        name={name}
        max={max}
        min={min}
        onChange={chngHandler}
        value={value}
        required
    />
);
