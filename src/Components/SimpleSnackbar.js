import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SimpleSnackbar({ handleClose, open, message }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
