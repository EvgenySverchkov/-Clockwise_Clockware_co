import React, {useContext} from "react";
import PropTypes from "prop-types";

import Tooltip from "../CustomTooltip";
import Context from "../../ContextComponent";

const PasswordField = ({ id }) => {
  const context = useContext(Context);
  return (
  <div className="col-sm-8 col-md-8">
    <Tooltip 
      title={context.warningTooltipMsg} 
      open={context.isOpenWarningTooltip} 
      fieldId = {context.idForTooltip}
      tooltipIsOpen = {context.isOpenWarningTooltip}>
      <input
        id={id}
        type="password"
        name="password"
        className="form-control"
        autoComplete="username"
        required
      />
    </Tooltip>
  </div>
)
}

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
};

export default PasswordField;
