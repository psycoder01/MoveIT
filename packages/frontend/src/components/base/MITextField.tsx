import React from "react";
import { TextField, type TextFieldProps } from "@mui/material";

export const MITextField: React.FC<TextFieldProps> = ({
  name,
  value,
  onChange,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      size="small"
      {...props}
    />
  );
};

export default MITextField;
