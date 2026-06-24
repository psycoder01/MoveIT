import { Snackbar, Alert } from "@mui/material";

interface MISnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info";
  handleCloseSnackbar: () => void;
}

export const MISnackbar: React.FC<MISnackbarProps> = ({
  open,
  message,
  severity,
  handleCloseSnackbar,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
