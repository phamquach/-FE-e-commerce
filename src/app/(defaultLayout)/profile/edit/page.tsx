"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import ProfileDesktopSkeleton from "@/components/ProfileSkeleton";

import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import {
  Avatar,
  Box,
  Button,
  Grid,
  Input,
  Typography,
  styled,
} from "@mui/material";
import updateUser from "@/services/api/updateUser";
import { toast } from "react-toastify";
import { isObjectShallowEqual } from "@/lib";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Edit() {
  const route = useRouter();
  const { user, login } = useAuth();
  const [userData, setUserData] = React.useState<User | null>(user);

  React.useEffect(() => {
    setUserData(user);
  }, [user]);

  const infoUser = React.useMemo(() => {
    return {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      address: userData?.address,
      phoneNumber: userData?.phoneNumber,
      email: userData?.email,
    };
  }, [userData]);

  const handleOnChangeValue = (key: string, value: string) => {
    if (userData) {
      setUserData({ ...userData, [key]: value.trim() });
    }
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && userData) {
      URL.revokeObjectURL(userData?.avt);
      setUserData({
        ...userData,
        avt: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleUpdateUser = async () => {
    try {
      if (userData && user && !isObjectShallowEqual<User>(user, userData)) {
        const response = await updateUser(userData);
        login(response?.data);
        toast.success("Cập nhập thông tin thành công!");
      }

      route.back();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  if (userData === null) {
    return <ProfileDesktopSkeleton />;
  }

  return (
    <Grid
      display="grid"
      gridTemplateColumns={{ xs: "auto", md: "25% 1fr" }}
      gap={2}
    >
      {/* Cột trái: avatar + upload */}
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
          src={userData.avt}
          sx={{
            width: { sm: 150, xs: 100 },
            height: { sm: 150, xs: 100 },
            fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
          }}
        >
          {userData.lastName[0]}
        </Avatar>

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={handleChangeAvatar}
            multiple
          />
        </Button>
      </Box>

      {/* Cột phải: thông tin user */}
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
          Xin Chào {`${userData.firstName} ${userData.lastName}`}!
          <FavoriteBorderOutlinedIcon />
        </Typography>

        <Box mt={4}>
          {(Object.keys(infoUser) as Array<keyof typeof infoUser>).map(
            (key) => (
              <Box key={key} mb={3}>
                <Input
                  defaultValue={`${infoUser[key]}`}
                  onChange={(e) => handleOnChangeValue(key, e.target.value)}
                  sx={{ fontWeight: 50, width: "100%" }}
                  startAdornment={
                    <Typography width="max-content" pr={2}>
                      {key}:
                    </Typography>
                  }
                />
              </Box>
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
          onClick={handleUpdateUser}
        >
          Save
        </Button>
      </Box>
    </Grid>
  );
}

export default Edit;
