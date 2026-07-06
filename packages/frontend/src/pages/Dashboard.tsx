import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";

import { signout } from "@/api/auth";
import { OrganizationPlan } from "@/types/organization";

import { MIButton } from "src/components/base/MIButton";
import { MISnackbar } from "src/components/base/MISnackbar";
import MITextField from "@/components/base/MITextField";
import { useAuthStore } from "@/context/authStore";
import {
  useCreateOrganization,
  useGetOrganizationsByUserId,
} from "@/hooks/useOrganization";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [orgData, setOrgData] = useState({
    name: "",
    slug: "",
    description: "",
    plan: OrganizationPlan.FREE as OrganizationPlan,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info",
  });
  const navigate = useNavigate();

  const { user, setUser } = useAuthStore();
  const { data, isLoading } = useGetOrganizationsByUserId(user?.id || "");
  const { mutateAsync: createOrganization } = useCreateOrganization();

  const handleCreateOrganization = async () => {
    if (!orgData.name.trim() || !orgData.slug.trim()) return;

    setLoading(true);

    try {
      if (!user?.id) throw new Error("User not logged.");

      await createOrganization({
        ...orgData,
        created_by: user.id,
      });
      setSnackbar({
        open: true,
        message: "Organization created successfully.",
        severity: "success",
      });
      setModalOpen(false);
      setOrgData({
        name: "",
        slug: "",
        description: "",
        plan: OrganizationPlan.FREE,
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
      setUser(null);
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

  const handleCloseModal = () => {
    setModalOpen(false);
    setOrgData({
      name: "",
      slug: "",
      description: "",
      plan: OrganizationPlan.FREE,
    });
  };

  const renderOrgs = () => {
    if (isLoading) return <>Loading...</>;
    if (!data) return <>Error...</>;
    if (data.data.length === 0)
      return (
        <Typography variant="body2" color="text.secondary">
          No organizations found. Create one to get started.
        </Typography>
      );

    return (
      <List>
        {data.data.map((org) => (
          <ListItem
            key={org.id}
            divider
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/organization/${org.id}`)}
          >
            <ListItemText primary={org.name} secondary={`Slug: ${org.slug}`} />
            <ListItemSecondaryAction>
              <Chip
                label={org.plan}
                color={org.is_active ? "success" : "default"}
                size="small"
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
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
            Organizations
          </Typography>
          <MIButton
            variant="contained"
            onClick={() => setModalOpen(true)}
            disabled={loading}
          >
            +
          </MIButton>
          {renderOrgs()}
        </CardContent>
      </Card>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create Organization</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <MITextField
              label="Organization Name"
              value={orgData.name}
              onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
              fullWidth
              required
            />
            <MITextField
              label="Slug"
              value={orgData.slug}
              onChange={(e) => setOrgData({ ...orgData, slug: e.target.value })}
              fullWidth
              required
              helperText="Unique identifier for your organization"
            />
            <MITextField
              label="Description"
              value={orgData.description}
              onChange={(e) =>
                setOrgData({ ...orgData, description: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />
            <FormControl fullWidth>
              <InputLabel>Plan</InputLabel>
              <Select
                value={orgData.plan}
                label="Plan"
                onChange={(e) =>
                  setOrgData({
                    ...orgData,
                    plan: e.target.value as OrganizationPlan,
                  })
                }
              >
                <MenuItem value={OrganizationPlan.FREE}>Free</MenuItem>
                <MenuItem value={OrganizationPlan.BASIC}>Basic</MenuItem>
                <MenuItem value={OrganizationPlan.PRO}>Pro</MenuItem>
                <MenuItem value={OrganizationPlan.ENTERPRISE}>
                  Enterprise
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrganization}
            variant="contained"
            disabled={!orgData.name.trim() || !orgData.slug.trim() || loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <MISnackbar {...snackbar} handleCloseSnackbar={handleCloseSnackbar} />
    </Box>
  );
};

export default Dashboard;
