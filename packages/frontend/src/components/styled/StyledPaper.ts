import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 400,
  borderRadius: 8,
  boxShadow: "0 7px 15px rgba(0,0,0,0.1)",
}));
