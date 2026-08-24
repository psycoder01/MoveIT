import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { Box, Typography, Button, Stack, Paper, CircularProgress } from "@mui/material";

import { MISnackbar } from "@/components/base/MISnackbar";
import { acceptOrDeclineInvitation, InvitationStatus } from "@/api/invitations";

export const Invitation: React.FC = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const organization = (location.state as { organization?: string })?.organization;

  const [loading, setLoading] = useState<"accept" | "decline" | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "info" });

  const handleAccept = async () => {
    if (!invitationId) return;
    setLoading("accept");
    try {
      await acceptOrDeclineInvitation(invitationId, InvitationStatus.accepted)
      setSnackbar({ open: true, message: "Invitation accepted.", severity: "success" });
      navigate("/dashboard");
    } catch {
      setSnackbar({ open: true, message: "Failed to accept invitation.", severity: "error" });
    } finally {
      setLoading(null);
    }
  };

  const handleDecline = async () => {
    if (!invitationId) return;
    setLoading("decline");
    try {
      await acceptOrDeclineInvitation(invitationId, InvitationStatus.declined)
      setSnackbar({ open: true, message: "Invitation declined.", severity: "info" });
      navigate("/dashboard");
    } catch {
      setSnackbar({ open: true, message: "Failed to decline invitation.", severity: "error" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
      }}
    >
      <Paper elevation={2} sx={{ p: 4, maxWidth: 420, width: "100%", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Organization Invitation
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You've been invited to join{" "}
          <strong>{organization || "this organization"}</strong>.
        </Typography>
        <Stack direction="row" spacing={2} >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            disabled={loading !== null}
          >
            {loading === "accept" ? <CircularProgress size={20} color="inherit" /> : "Accept"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDecline}
            disabled={loading !== null}
          >
            {loading === "decline" ? <CircularProgress size={20} color="inherit" /> : "Decline"}
          </Button>
        </Stack>
      </Paper>

      <MISnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleCloseSnackbar={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default Invitation;