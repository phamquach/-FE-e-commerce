"use client";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ProfileDesktopSkeleton from "@/components/ProfileSkeleton";
import { useAuth } from "@/contexts/authContext";

function ProfileDesktop() {
  const { user } = useAuth();

  if (!user) {
    return <ProfileDesktopSkeleton />;
  }
  return (
    <Grid
      display={"grid"}
      gridTemplateColumns={{ xs: "auto", md: "25% 1fr" }}
      gap={2}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        p={3}
        borderRadius={2}
        bgcolor={"white"}
        alignItems={"center"}
      >
        <Avatar
          src={user?.avt}
          sx={{
            width: { sm: 150, xs: 100 },
            height: { sm: 150, xs: 100 },
            fontSize: { xs: "5rem", sm: "8rem", md: "10rem" },
          }}
        >
          {user?.lastName[0]}
        </Avatar>
        <Button variant="outlined" color="info" sx={{ width: "100%" }}>
          Choose Image
        </Button>
      </Box>

      <Box
        p={3}
        borderRadius={2}
        bgcolor={"white"}
        gridColumn={"auto"}
        position={"relative"}
      >
        <Typography
          variant="h4"
          color="var(--background-default)"
          textAlign={"center"}
          fontFamily={"var(--font-header-default) !important"}
        >
          Xin Chào {`${user?.firstName} ${user?.lastName}`}!&nbsp;
          <FavoriteBorderOutlinedIcon />
        </Typography>
        <br />
        <Typography
          variant="h6"
          fontFamily={"var(--font-header-default) !important"}
          sx={{ fontWeight: 50 }}
        >
          Họ và tên: &nbsp; {`${user?.firstName} ${user?.lastName}`}
        </Typography>
        <br />
        <Typography
          variant="h6"
          fontFamily={"var(--font-header-default) !important"}
          sx={{ fontWeight: 50 }}
        >
          Địa chỉ: &nbsp; {user?.address}
        </Typography>
        <br />
        <Typography
          variant="h6"
          fontFamily={"var(--font-header-default) !important"}
          sx={{ fontWeight: 50 }}
        >
          Email: &nbsp; {user?.email}
        </Typography>
        <br />
        <Typography
          variant="h6"
          fontFamily={"var(--font-header-default) !important"}
          sx={{ fontWeight: 50 }}
        >
          SĐT: &nbsp; {user?.phoneNumber}
        </Typography>
        <br />
         <Typography
          variant="h6"
          fontFamily={"var(--font-header-default) !important"}
          sx={{ fontWeight: 50 }}
        >
          Role: &nbsp; {user?.role}
        </Typography>
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
        >
          Edit
        </Button>
        <br />
        <br />
      </Box>
    </Grid>
  );
}

export default ProfileDesktop;
