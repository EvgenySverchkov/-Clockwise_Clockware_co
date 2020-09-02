import React, {useContext} from "react";
import PropTypes from "prop-types";

import Tooltip from "../CustomTooltip";
import Context from "../../ContextComponent";

const NumField = ({ max, min, id, value, chngHandler, name }) => {
  const context = useContext(Context);
  return (
  <div className="col-sm-3">
    <Tooltip 
      title={context.warningTooltipMsg} 
      open={context.isOpenWarningTooltip} 
      fieldId = {context.idForTooltip}
      tooltipIsOpen = {context.isOpenWarningTooltip}>
      <input
        id={id}
        className="form-control"
        type="number"
        min={min}
        max={max}
        onChange={chngHandler || null}
        value={value}
        name={name}
      />
    </Tooltip>
  </div>
  );
}

NumField.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default NumField;
