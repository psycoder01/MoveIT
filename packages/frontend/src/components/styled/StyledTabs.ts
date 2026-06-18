import { Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiTab-root": {
    textTransform: "none",
    fontSize: 16,
    fontWeight: 500,
    minWidth: 120,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#0079bf",
    height: 3,
  },
}));
