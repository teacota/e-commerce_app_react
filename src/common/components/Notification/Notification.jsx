import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notification({
  open,
  handleClose,
  description,
  severity,
}) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        sx={{ width: "100%", backgroundColor: "#AFE1AF", color: "black" }}
      >
        {description}
      </Alert>
    </Snackbar>
  );
}
