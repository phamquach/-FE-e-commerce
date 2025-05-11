import { Box, Skeleton } from "@mui/material";

export default function SkeletonCarousell() {
  return (
    <Box height={"max-content"}>
      {/* Skeleton Image chính */}
      <Box height={250} position="relative" mb={2}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: 2 }}
        />
      </Box>

      <Box position="relative">
        {/* Skeleton các thumbnail ảnh nhỏ */}
        <Box
          display="flex"
          overflow="hidden"
          gap={1}
          sx={{ scrollbarWidth: "none" }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              flexShrink={0}
              sx={{
                width: "15%",
                p: "2px",
                borderRadius: 1,
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
