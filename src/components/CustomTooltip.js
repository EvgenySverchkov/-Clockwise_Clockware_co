import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from "@material-ui/core/styles";

const MyTooltip = withStyles({
  tooltip: {
    backgroundColor: "red",
    fontSize: 12,
    marginTop: 1 
  },
  arrow: {
    color: "red"
  }
})(Tooltip);

const WarningTooltip = ({children, title, fieldId, tooltipIsOpen, withBorder=true}) => {
    return (
      <MyTooltip
        arrow
        open = {tooltipIsOpen ? (fieldId == children.props.id ? true : false) : false} 
        className = {withBorder ? (tooltipIsOpen? (fieldId == children.props.id ? "border border-danger" : "") : ""):""}
        title={title} >
          {children}
      </MyTooltip>
    );
}

export default WarningTooltip;