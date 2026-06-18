import React from "react";
import { type ButtonProps } from "@mui/material";
import { SocialButton } from "src/components/styled/SocialButton";

interface MISocialButtonProps extends ButtonProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const MISocialButton: React.FC<MISocialButtonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <SocialButton fullWidth variant="outlined" startIcon={icon} {...props}>
      {children}
    </SocialButton>
  );
};
