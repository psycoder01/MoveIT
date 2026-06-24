import React, { useState } from "react";
import { Box, Link, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { MITextField } from "src/components/base/MITextField";
import { FormSection } from "src/components/styled/FormSection";

interface LoginSectionProps {
  username: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginSection: React.FC<LoginSectionProps> = ({
  username,
  password,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FormSection>
        <MITextField
          label="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
      </FormSection>
      <FormSection>
        <MITextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={onChange}
          required
          slotProps={{
            input: {
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
            },
          }}
        />
      </FormSection>
      <Box>
        <Link href="#" variant="body2" sx={{ color: "#0079bf" }}>
          Forgot password?
        </Link>
      </Box>
    </>
  );
};
