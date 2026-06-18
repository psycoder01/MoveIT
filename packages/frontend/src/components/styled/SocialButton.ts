import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SocialButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  justifyContent: "flex-start",
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  borderColor: "#dfe1e6",
  color: "#172b4d",
  "&:hover": {
    backgroundColor: "#f4f5f7",
    borderColor: "#b3bac5",
  },
}));
