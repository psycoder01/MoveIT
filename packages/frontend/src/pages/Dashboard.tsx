import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

import { signout } from "@/api/auth";

import { MIButton } from "src/components/base/MIButton";
import { MISnackbar } from "src/components/base/MISnackbar";

const Dashboard: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info",
  });
  const navigate = useNavigate();

  const handleCreateOrganization = async () => {
    if (!orgName.trim()) return;

    setLoading(true);

    try {
      console.log({ orgName });
      setSnackbar({
        open: true,
        message: "Create organization successful.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error occurred.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
      setSnackbar({
        open: true,
        message: "Sign out successful.",
        severity: "success",
      });
      navigate("/auth");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error occurred.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create Organization
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Create your organization
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              fullWidth
              disabled={loading}
            />
            <MIButton
              loading={loading}
              onClick={handleCreateOrganization}
              disabled={!orgName.trim()}
            >
              Create
            </MIButton>
          </Box>
        </CardContent>
      </Card>
      <MISnackbar {...snackbar} handleCloseSnackbar={handleCloseSnackbar} />
    </Box>
  );
};

export default Dashboard;
