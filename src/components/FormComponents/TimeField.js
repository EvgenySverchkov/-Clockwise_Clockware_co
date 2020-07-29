import React from "react";
import PropTypes from "prop-types";

const TimeField = ({name, max, min, chngHandler, value})=>(
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

TimeField.propTypes = {
    name: PropTypes.string.isRequired, 
    max: PropTypes.string.isRequired, 
    min: PropTypes.string.isRequired, 
    chngHandler: PropTypes.func, 
    value: PropTypes.string
}

export default TimeField;