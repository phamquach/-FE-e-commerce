import { formatCurrency } from "@/lib";
import { Share } from "@mui/icons-material";
import { Box, IconButton, Rating, Typography } from "@mui/material";
import SkeletonProductIntroduction from "./ProductIntroductionSkeleton";
import { memo } from "react";

function ProductIntroduction({ data }: { data: Products }) {
  if (!data) {
    return <SkeletonProductIntroduction />;
  }
  return (
    <Box>
      <Typography variant="h5">{data.name}</Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Rating defaultValue={3.5} precision={0.5} size="small" readOnly />
        <IconButton color="default">
          <Share fontSize="small" color="disabled" />
        </IconButton>
      </Box>
      <Box display={"flex"}>
        <Typography variant="caption" color="textDisabled">
          Số lượng:&nbsp;
        </Typography>
        <Typography variant="caption" color="info">
          {data.stock}
        </Typography>
      </Box>
      <Typography color="textSecondary">{data.description}</Typography>

      <Box display={"flex"} color={"#f57224"}>
        <Typography variant="h6">{formatCurrency(data.price)}</Typography>
      </Box>
    </Box>
  );
}

export default memo(ProductIntroduction);
