import React from "react";

import { Google, Facebook } from "@mui/icons-material";
import { MISocialButton } from "src/components/base/MISocialButton";

export const SocialSection: React.FC = () => {
  return (
    <>
      <MISocialButton icon={<Google />}>Continue with Google</MISocialButton>
    </>
  );
};
