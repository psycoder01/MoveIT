import React, { useState } from "react";
import { Tab, Divider } from "@mui/material";

import { StyledContainer } from "src/components/styled/StyledContainer";
import { StyledPaper } from "src/components/styled/StyledPaper";
import { LogoBox } from "src/components/styled/LogoBox";
import { Logo } from "src/components/styled/Logo";
import { StyledTabs } from "src/components/styled/StyledTabs";
import { MIButton } from "src/components/base/MIButton";

import { LoginSection } from "src/components/derived/LoginSection";
import { SignupSection } from "src/components/derived/SignupSection";
import { SocialSection } from "src/components/derived/SocialSection";

const Auth: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleTabChange = (_: unknown, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper>
        <LogoBox>
          <Logo variant="h1">MoveIT</Logo>
        </LogoBox>

        <StyledTabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Log in" />
          <Tab label="Sign up" />
        </StyledTabs>

        <form onSubmit={handleSubmit}>
          {tabValue === 1 ? (
            <SignupSection
              name={formData.name}
              email={formData.email}
              password={formData.password}
              confirmPassword={formData.confirmPassword}
              onNameChange={handleChange}
              onEmailChange={handleChange}
              onPasswordChange={handleChange}
              onConfirmPasswordChange={handleChange}
            />
          ) : (
            <LoginSection
              email={formData.email}
              password={formData.password}
              onEmailChange={handleChange}
              onPasswordChange={handleChange}
            />
          )}
          <MIButton type="submit">
            {tabValue === 0 ? "Log In" : "Sign Up"}
          </MIButton>
        </form>
        <Divider sx={{ my: 3 }}>OR</Divider>
        <SocialSection />
      </StyledPaper>
    </StyledContainer>
  );
};

export default Auth;
