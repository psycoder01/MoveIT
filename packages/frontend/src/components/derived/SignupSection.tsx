import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { MITextField } from "src/components/base/MITextField";
import { FormSection } from "src/components/styled/FormSection";

interface SignupSectionProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SignupSection: React.FC<SignupSectionProps> = ({
  firstName,
  lastName,
  username,
  email,
  password,
  confirmPassword,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <FormSection>
        <MITextField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={onChange}
          required
        />
      </FormSection>
      <FormSection>
        <MITextField
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={onChange}
          required
        />
      </FormSection>
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
          label="Email"
          name="email"
          type="email"
          value={email}
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
      <FormSection>
        <MITextField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={onChange}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FormSection>
    </>
  );
};
