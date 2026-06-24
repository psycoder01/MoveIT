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

import { login, signup } from "@/api/auth";

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { email, password, firstName, lastName, username } = formData;

      if (tabValue === 0) await login({ username, password });
      if (tabValue === 1)
        await signup({ firstName, lastName, username, email, password });
    } catch (err) {
      console.log("error");
    } finally {
      setLoading(false);
    }
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
              firstName={formData.firstName}
              lastName={formData.lastName}
              username={formData.username}
              email={formData.email}
              password={formData.password}
              confirmPassword={formData.confirmPassword}
              onChange={handleChange}
            />
          ) : (
            <LoginSection
              username={formData.username}
              password={formData.password}
              onChange={handleChange}
            />
          )}
          <MIButton type="submit" loading={loading}>
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
