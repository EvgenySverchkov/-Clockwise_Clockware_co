import React, { useContext } from "react";
import PropTypes from "prop-types";

import Tooltip from "../CustomTooltip";
import Context from "../../ContextComponent";

const EmailField = ({ id, chngHandler, value, readonly = false }) => {
  const context = useContext(Context);
  return (
    <div className="col-sm-8 col-md-8">
      <Tooltip
        title={context.warningTooltipMsg}
        open={context.isOpenWarningTooltip}
        fieldId={context.idForTooltip}
        tooltipIsOpen={context.isOpenWarningTooltip}
      >
        <input
          id={id}
          type="email"
          name="email"
          className="form-control"
          onChange={chngHandler || null}
          value={value}
          required
          readOnly={readonly}
        />
      </Tooltip>
    </div>
  );
};

EmailField.propTypes = {
  id: PropTypes.string,
  chngHandler: PropTypes.func,
  value: PropTypes.string,
};

export default EmailField;
