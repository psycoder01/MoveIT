import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { MIButton } from "src/components/base/MIButton";

const Dashboard: React.FC = () => {
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleCreateOrganization = async () => {
    if (!orgName.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      console.log({ orgName });
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
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
          {message && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}
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
    </Box>
  );
};

export default Dashboard;
