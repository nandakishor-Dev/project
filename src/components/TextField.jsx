import React from "react";
import { TextField } from "@mui/material";

const TextFieldComponent = ({
  label,
  value,
  onChange,
  error,
  helperText,
  fullWidth = true,
  size="small",
  variant = "outlined",
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error ? helperText : ""}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      {...props}
    />
  );
};

export default TextFieldComponent;
