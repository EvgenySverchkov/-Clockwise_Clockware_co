import React, { useContext } from "react";

import Context from "../ContextComponent";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SuccessWindow = () => {
  const context = useContext(Context);
  return (
    <Snackbar
      open={context.successWindowIsOpen}
      autoHideDuration={6000}
      onClose={context.closeSuccessWindow}
    >
      <Alert onClose={context.closeSuccessWindow} severity="success">
        {context.successWindowMsg}
      </Alert>
    </Snackbar>
  );
};

export default SuccessWindow;
