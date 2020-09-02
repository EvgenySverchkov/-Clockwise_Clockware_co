import React, {useContext} from "react";
import PropTypes from "prop-types";

import Context from "../../ContextComponent";
import Tooltip from "../CustomTooltip";

const TimeField = ({ name, max, min, chngHandler, value }) => {
  const context = useContext(Context);
  return (
    <Tooltip 
    title={context.warningTooltipMsg} 
    open={context.isOpenWarningTooltip} 
    fieldId = {context.idForTooltip}
    tooltipIsOpen = {context.isOpenWarningTooltip}>
      <input
        type="time"
        name={name}
        max={max || null}
        min={min || null}
        onChange={chngHandler}
        value={value}
        id = "time"
        required
      />
    </Tooltip>
  );
}

TimeField.propTypes = {
  name: PropTypes.string.isRequired,
  max: PropTypes.string,
  min: PropTypes.string,
  chngHandler: PropTypes.func,
  value: PropTypes.string,
};

export default TimeField;
