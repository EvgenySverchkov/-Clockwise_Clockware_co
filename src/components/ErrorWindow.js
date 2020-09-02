import React, { useContext } from "react";

import Context from "../ContextComponent";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorWindow = () => {
  const context = useContext(Context);
  return (
    <Snackbar
      open={context.errorWindowIsOpen}
      autoHideDuration={3000}
      onClose={context.closeErrorWindow}
    >
      <Alert onClose={context.closeErrorWindow} severity="error">
        {context.errorWindowMsg}
      </Alert>
    </Snackbar>
  );
};

export default ErrorWindow;
