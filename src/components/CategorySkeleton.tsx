import { Box, Grid, Skeleton } from "@mui/material";

const CategorySkeleton = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", p: 2 }}>
      <Skeleton sx={{ width: { sm: "10%", xs: "35%" } }} height={50} />

      <Grid
        container
        display={"grid"}
        spacing={2}
        gridTemplateColumns={"repeat(7,1fr)"}
        sx={{ gridAutoRows: "auto", overflowX: "hidden" }}
        py={3}
      >
        {Array.from({ length: 14 }).map((_, index) => (
          <Grid key={index} width={"max-content"}>
            <Box
              sx={{
                bgcolor: "#fff",
                p: 2,
                borderRadius: 2,
                boxShadow: 1,
                textAlign: "center",
              }}
            >
              <Skeleton
                variant="circular"
                width={60}
                height={60}
                sx={{ mx: "auto", mb: 1 }}
              />
              <Skeleton
                sx={{
                  mx: "auto",
                  minWidth: { xs: 100, sm: 120 },
                  maxWidth: { xs: 120, sm: 150 },
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySkeleton;
