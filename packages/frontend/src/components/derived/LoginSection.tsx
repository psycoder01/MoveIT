import React, { useState } from "react";
import { Box, Link, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { MITextField } from "src/components/base/MITextField";
import { FormSection } from "src/components/styled/FormSection";

interface LoginSectionProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginSection: React.FC<LoginSectionProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FormSection>
        <MITextField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          required
        />
      </FormSection>

      <FormSection>
        <MITextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={onPasswordChange}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormSection>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Link href="#" variant="body2" sx={{ color: "#0079bf" }}>
          Forgot password?
        </Link>
      </Box>
    </>
  );
};
