import React, {useContext} from "react";
import PropTypes from "prop-types";

import Tooltip from "../CustomTooltip";
import Context from "../../ContextComponent";

const TextField = ({ id, name, chngHandler, value }) => {
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
      type="text"
      name={name || null}
      className="form-control"
      onChange={chngHandler || null}
      value={value}
      required
    />
    </Tooltip>
  </div>);
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  chngHandler: PropTypes.func,
  value: PropTypes.node,
};

export default TextField;
