import React, { useContext } from "react";
import PropTypes from "prop-types";

import Context from "../../ContextComponent";
import Tooltip from "../CustomTooltip";

const DateField = ({ min, chngHandler, value, name, max }) => {
  const context = useContext(Context);
  return (
    <Tooltip
      title={context.warningTooltipMsg}
      open={context.isOpenWarningTooltip}
      fieldId={context.idForTooltip}
      tooltipIsOpen={context.isOpenWarningTooltip}
    >
      <input
        type="date"
        name={name}
        min={min}
        max={max}
        className="mr-1"
        onChange={chngHandler}
        value={value}
        id="date"
        required
      />
    </Tooltip>
  );
};

DateField.propTypes = {
  min: PropTypes.string.isRequired,
  chngHandler: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
};

export default DateField;
