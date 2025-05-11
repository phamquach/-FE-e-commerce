"use client";
import { Box, Skeleton } from "@mui/material";

export default function PurchasePanelSkeleton() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor="white"
      p={2}
      className="border-radius-default"
    >
      <Box>
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="text" width="80%" height={28} />
      </Box>

      <Box>
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="rectangular" width="120px" height={36} />
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton variant="text" width="40px" height={28} />
        <Skeleton variant="text" width="80px" height={28} />
      </Box>

      <Box display="flex" justifyContent="space-around" gap={2}>
        <Skeleton variant="rectangular" width="40%" height={40} />
        <Skeleton variant="rectangular" width="40%" height={40} />
      </Box>
    </Box>
  );
}
