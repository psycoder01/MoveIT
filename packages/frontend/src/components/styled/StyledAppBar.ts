import { AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: "#ffffff",
  color: "rgba(0, 0, 0, 0.87)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
}));

export type { AppBarProps } from "@mui/material";
