"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

import { useAuth } from "@/contexts/authContext";
import ProfileDesktopSkeleton from "@/components/ProfileSkeleton";
import ROUTES from "@/routes/routes";

import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

function ProfileDesktop() {
  const { user } = useAuth();
  const route = useRouter();

  const infoUser = useMemo(() => {
    return {
      Name: `${user?.firstName} ${user?.lastName}`,
      Address: user?.address,
      Email: user?.email,
      PhoneNumber: user?.phoneNumber,
      Role: user?.role,
    };
  }, [user]);

  if (!user) {
    return <ProfileDesktopSkeleton />;
  }

  return (
    <Grid
      display="grid"
      gridTemplateColumns={{ xs: "auto", md: "25% 1fr" }}
      gap={2}
    >
      {/* Cột trái: Avatar */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        p={3}
        borderRadius={2}
        bgcolor="white"
        alignItems="center"
      >
        <Avatar
          src={user.avt}
          sx={{
            width: { sm: 150, xs: 100 },
            height: { sm: 150, xs: 100 },
            fontSize: { xs: "5rem", sm: "8rem", md: "10rem" },
          }}
        >
          {user.lastName[0]}
        </Avatar>
      </Box>

      {/* Cột phải: Thông tin user */}
      <Box
        p={3}
        borderRadius={2}
        bgcolor="white"
        gridColumn="auto"
        position="relative"
      >
        <Typography
          variant="h4"
          color="var(--background-default)"
          textAlign="center"
          fontFamily="var(--font-header-default) !important"
        >
          Xin Chào {`${user.firstName} ${user.lastName}`}!{" "}
          <FavoriteBorderOutlinedIcon />
        </Typography>

        <Box mt={4} display="flex" flexDirection="column" gap={2}>
          {(Object.keys(infoUser) as Array<keyof typeof infoUser>).map(
            (key) => (
              <Typography
                variant="h6"
                fontWeight={50}
                key={key}
                fontFamily={"var(--font-header-default) !important"}
              >
                {key}:&nbsp; {infoUser[key]}
              </Typography>
            )
          )}
        </Box>

        <br />
        <Button
          variant="contained"
          endIcon={<EditIcon />}
          sx={{
            position: "absolute",
            bottom: 24,
            right: 24,
            bgcolor: "var(--background-default)",
          }}
          onClick={() => route.push(ROUTES.edit)}
        >
          Edit
        </Button>
      </Box>
    </Grid>
  );
}

export default ProfileDesktop;
