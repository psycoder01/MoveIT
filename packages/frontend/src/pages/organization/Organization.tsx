import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { MIButton } from "src/components/base/MIButton";
import { MISnackbar } from "src/components/base/MISnackbar";
import MITextField from "@/components/base/MITextField";
import { useGetOrganizationById } from "@/hooks/useOrganization";

const INITIAL_BOARD_DATA = {
  id: "",
  name: "",
  description: "",
};

const Organization: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [boardData, setBoardData] = useState(INITIAL_BOARD_DATA);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "info",
  });
  const navigate = useNavigate();

  const { data: organization, isLoading } = useGetOrganizationById(
    params.organizationId || "",
  );
  const boards = [] as (typeof INITIAL_BOARD_DATA)[];

  const handleCreateBoard = async () => {
    if (!boardData.name.trim()) return;

    setLoading(true);

    try {
      setSnackbar({
        open: true,
        message: "Board created successfully.",
        severity: "success",
      });
      setModalOpen(false);
      setBoardData(INITIAL_BOARD_DATA);
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

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setBoardData(INITIAL_BOARD_DATA);
  };

  const renderBoards = () => {
    if (isLoading) return <>Loading...</>;
    if (!boards) return <>Error...</>;
    if (boards.length === 0)
      return (
        <Typography variant="body2" color="text.secondary">
          No boards found. Create one to get started.
        </Typography>
      );

    return (
      <List>
        {boards.map((board: typeof INITIAL_BOARD_DATA) => (
          <ListItem
            key={board.id}
            divider
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/boards/${board.id}`)}
          >
            <ListItemText
              primary={board.name}
              secondary={`Description: ${board.description}`}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  if (!organization || !organization.data.name)
    return <>organization not found.</>;

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
      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {organization.data.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Boards
          </Typography>
          <MIButton
            variant="contained"
            onClick={() => setModalOpen(true)}
            disabled={loading}
          >
            +
          </MIButton>
          {renderBoards()}
        </CardContent>
      </Card>

      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create board</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <MITextField
              label="Board Name"
              value={boardData.name}
              onChange={(e) =>
                setBoardData({ ...boardData, name: e.target.value })
              }
              fullWidth
              required
            />
            <MITextField
              label="Description"
              value={boardData.description}
              onChange={(e) =>
                setBoardData({ ...boardData, description: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateBoard}
            variant="contained"
            disabled={!boardData.name.trim() || loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <MISnackbar {...snackbar} handleCloseSnackbar={handleCloseSnackbar} />
    </Box>
  );
};

export default Organization;
