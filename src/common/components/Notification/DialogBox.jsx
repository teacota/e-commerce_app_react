import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePaymentForm = () => {
    // history.push("payment-form");
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "red",
            fontFamily: "Pushster",
            width: "140px",
            height: "50px",
            marginRight: "60px",
            cursor: "pointer",
            ":hover": {
              color: "white",
              backgroundColor: "red",
              border: "1px solid red",
            },
          }}
        >
          Checkout
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText
            sx={{ fontWeight: "bold", fontFamily: "Pushster", color: "black" }}
          >
            Do you want to proceed with the payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{ color: "#36454F",fontFamily: "Pushster", }}>
            No
          </Button>
          <Button
            onClick={() => history.push("/payment-form")}
            autoFocus
            sx={{ color: "#36454F",fontFamily: "Pushster", }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
