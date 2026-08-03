import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router";

import { session } from "@/api/auth";
import { useAuthStore } from "@/context/authStore";
import ProfileTopBar from "@/components/derived/ProfileTopBar";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await session();
        setUser(user.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <ProfileTopBar />
      <Box
        component="main"
        sx={{
          pt: 8,
          pb: { xs: 4, md: 6 },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
