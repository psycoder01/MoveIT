import React from "react";
import { Button, type ButtonProps } from "@mui/material";

interface MIButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const MIButton: React.FC<MIButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      size="large"
      sx={{
        backgroundColor: "#0079bf",
        "&:hover": {
          backgroundColor: "#005a87",
        },
        textTransform: "none",
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 2,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
