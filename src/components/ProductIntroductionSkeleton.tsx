import { Box, Skeleton, IconButton } from "@mui/material";
import { Share } from "@mui/icons-material";

export default function SkeletonProductIntroduction() {
  return (
    <Box>
      {/* Tên sản phẩm */}
      <Skeleton variant="text" width="60%" height={32} />

      {/* Đánh giá + nút chia sẻ */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Skeleton variant="rectangular" width={80} height={20} />
        <IconButton disabled>
          <Share fontSize="small" color="disabled" />
        </IconButton>
      </Box>

      {/* Số lượng */}
      <Box display="flex" alignItems="center" mt={1}>
        <Skeleton variant="text" width={70} height={20} />
        <Skeleton variant="text" width={40} height={20} sx={{ ml: 1 }} />
      </Box>

      {/* Mô tả */}
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="90%" height={20} />
      <Skeleton variant="text" width="80%" height={20} />

      {/* Giá */}
      <Box mt={2}>
        <Skeleton variant="text" width="30%" height={32} />
      </Box>
    </Box>
  );
}
