import { Box, Grid, Skeleton, Typography } from "@mui/material";
export default function ProfileDesktopSkeleton() {
  return (
    <Grid
      display="grid"
      gridTemplateColumns={{ xs: "auto", md: "25% 1fr" }}
      gap={2}
    >
      {/* Avatar + Button Skeleton */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        p={3}
        borderRadius={2}
        bgcolor="white"
        alignItems={'center'}
      >
        <Skeleton
          variant="circular"
          animation="wave"
          sx={{
            width: 150,
            height: 150,
            fontSize: "10rem",
          }}
        />
        <Skeleton
          variant="rectangular"
          height={36}
          width={"100%"}
          animation="wave"
          sx={{ borderRadius: 1 }}
        />
      </Box>

      {/* Thông tin Skeleton */}
      <Box p={3} borderRadius={2} bgcolor="white" position="relative">
        <Typography
          variant="h4"
          textAlign="center"
          fontFamily={"var(--font-header-default) !important"}
        >
          <Skeleton
            width="60%"
            height={40}
            animation="wave"
            sx={{ mx: "auto" }}
          />
        </Typography>

        <br />
        {[...Array(4)].map((_, index) => (
          <Box key={index} mb={3}>
            <Typography
              variant="h6"
              fontFamily={"var(--font-header-default) !important"}
              sx={{ fontWeight: 50 }}
            >
              <Skeleton width="35%" height={28} animation="wave" />
            </Typography>
          </Box>
        ))}

        <Skeleton
          variant="rectangular"
          height={36}
          width={140}
          animation="wave"
          sx={{
            borderRadius: 1,
            position: "absolute",
            bottom: 24,
            right: 24,
          }}
        />
      </Box>
    </Grid>
  );
}
