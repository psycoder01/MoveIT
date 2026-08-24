import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Divider,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  MarkEmailRead as MarkEmailReadIcon,
  DeleteSweep as DeleteSweepIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

import { useAuthStore } from "@/context/authStore";
import { signout } from "@/api/auth";
import { MISnackbar } from "@/components/base/MISnackbar";
import { StyledAppBar } from "@/components/styled/StyledAppBar";
import { useGetNotificationsByUserId } from "@/hooks/useNotifications";

const BRAND_COLOR = "#0079bf";

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

type MenuType = "notifications" | "profile";

export const ProfileTopBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const { data: notifications } = useGetNotificationsByUserId(user?.id || "");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuType, setMenuType] = useState<MenuType | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "info" });

  const openMenu = (type: MenuType, event: React.MouseEvent<HTMLElement>) => {
    setMenuType(type);
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuType(null);
    setAnchorEl(null);
  };

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    openMenu("notifications", event);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    openMenu("profile", event);
  };

  const handleLogout = async () => {
    closeMenu();
    try {
      await signout();
      setUser(null);
      setSnackbar({
        open: true,
        message: "Signed out successfully.",
        severity: "success",
      });
      navigate("/auth");
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to sign out.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const displayName = user?.full_name || user?.username || "Account";
  const avatarUrl = user?.avatar_url || "";

  return (
    <>
      <StyledAppBar position="fixed" elevation={1}>
        <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 2 } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: BRAND_COLOR,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            MoveIt
          </Typography>

          {/* Notifications */}
          <Tooltip title="Notifications" placement="bottom">
            <IconButton
              color="inherit"
              aria-label="notifications"
              aria-controls={
                menuType === "notifications" ? "notifications-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={menuType === "notifications"}
              onClick={handleNotificationsClick}
              sx={{ mr: 1, color: "text.primary" }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title={displayName} placement="bottom">
            <IconButton
              onClick={handleProfileClick}
              aria-label="user account"
              aria-controls={
                menuType === "profile" ? "profile-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={menuType === "profile"}
              sx={{ p: 0.5, color: "text.primary" }}
            >
              <Avatar
                src={avatarUrl}
                alt={displayName}
                sx={{
                  width: 36,
                  height: 36,
                  ...(avatarUrl
                    ? {}
                    : {
                      backgroundColor: BRAND_COLOR,
                      color: "#fff",
                    }),
                }}
              >
                {!avatarUrl && (
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {getInitials(displayName)}
                  </Typography>
                )}
              </Avatar>
              <Typography
                variant="body2"
                component="span"
                sx={{
                  ml: 1,
                  fontWeight: 500,
                  color: "text.primary",
                  display: { xs: "none", sm: "inline" },
                }}
              >
                {displayName}
              </Typography>
            </IconButton>
          </Tooltip>

          {/* Notifications menu */}
          <Menu
            id="notifications-menu"
            anchorEl={anchorEl}
            open={menuType === "notifications"}
            onClose={closeMenu}
            onClick={closeMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: { width: 360, maxHeight: 480 },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                py: 1,
              }}
            >
              <Typography variant="subtitle1">Notifications</Typography>
            </Box>
            <Divider />
            {notifications?.data.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => {
                  closeMenu();
                  navigate(`/invitations/${item.reference_id}`, {
                    state: { organization: item.organization, organizationId: item.id, userId: user?.id },
                  });
                }}
                sx={{
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  ...(item.is_read
                    ? { opacity: 0.6 }
                    : { backgroundColor: "action.hover" }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                  <Badge overlap="circular" />
                </ListItemIcon>
                <ListItemText
                  primary={`You have been invited to ${item.organization}`}
                />
              </MenuItem>
            ))}
          </Menu>

          {/* {/* Profile menu */}
          {/* <Menu */}
          {/*   id="profile-menu" */}
          {/*   anchorEl={anchorEl} */}
          {/*   open={menuType === "profile"} */}
          {/*   onClose={closeMenu} */}
          {/*   onClick={closeMenu} */}
          {/*   TransitionComponent={Fade} */}
          {/*   transformOrigin="top right" */}
          {/*   anchorOrigin={{ vertical: "bottom", horizontal: "right" }} */}
          {/*   slotProps={{ */}
          {/*     paper: { */}
          {/*       sx: { width: 280 }, */}
          {/*     }, */}
          {/*   }} */}
          {/* > */}
          {/*   <Box */}
          {/*     sx={{ */}
          {/*       px: 2, */}
          {/*       py: 1.5, */}
          {/*       display: "flex", */}
          {/*       alignItems: "center", */}
          {/*       gap: 1.5, */}
          {/*     }} */}
          {/*   > */}
          {/*     <Avatar */}
          {/*       src={avatarUrl} */}
          {/*       alt={displayName} */}
          {/*       sx={{ */}
          {/*         width: 56, */}
          {/*         height: 56, */}
          {/*         ...(avatarUrl */}
          {/*           ? {} */}
          {/*           : { */}
          {/*               backgroundColor: BRAND_COLOR, */}
          {/*               color: "#fff", */}
          {/*             }), */}
          {/*       }} */}
          {/*     > */}
          {/*       {!avatarUrl && ( */}
          {/*         <Typography variant="subtitle1" fontWeight={700}> */}
          {/*           {getInitials(displayName)} */}
          {/*         </Typography> */}
          {/*       )} */}
          {/*     </Avatar> */}
          {/*     <Box sx={{ minWidth: 0, flex: 1 }}> */}
          {/*       <Typography variant="subtitle1" fontWeight={600} noWrap> */}
          {/*         {displayName} */}
          {/*       </Typography> */}
          {/*       {displayEmail && ( */}
          {/*         <Typography variant="caption" color="text.secondary" noWrap> */}
          {/*           {displayEmail} */}
          {/*         </Typography> */}
          {/*       )} */}
          {/*     </Box> */}
          {/*   </Box> */}
          {/**/}
          {/*   <Divider /> */}
          {/**/}
          {/*   <MenuItem onClick={() => navigate("/dashboard")}> */}
          {/*     <ListItemIcon> */}
          {/*       <AccountCircleIcon fontSize="small" /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Account" /> */}
          {/*   </MenuItem> */}
          {/**/}
          {/*   <MenuItem onClick={() => navigate("/dashboard")}> */}
          {/*     <ListItemIcon> */}
          {/*       <SettingsIcon fontSize="small" /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Settings" /> */}
          {/*   </MenuItem> */}
          {/**/}
          {/*   <Divider /> */}
          {/**/}
          {/*   <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}> */}
          {/*     <ListItemIcon> */}
          {/*       <LogoutIcon fontSize="small" color="error" /> */}
          {/*     </ListItemIcon> */}
          {/*     <ListItemText primary="Logout" /> */}
          {/*   </MenuItem> */}
          {/* </Menu> */}
        </Toolbar>
      </StyledAppBar>
      <MISnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </>
  );
};

export default ProfileTopBar;
