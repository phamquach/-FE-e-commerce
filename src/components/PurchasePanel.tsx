"use client";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatCurrency } from "@/lib";
import PurchasePanelSkeleton from "./PurchasePanelSkeleton";
import ROUTES from "@/routes/routes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

type Props = {
  quantity?: number;
  setQuantity: (val: number) => void;
  maxQuantity?: number;
  price?: number;
  productId: string | null;
};

export default function PurchasePanel({
  quantity,
  setQuantity,
  maxQuantity,
  price,
  productId,
}: Props) {
  const route = useRouter();
  const { user } = useAuth();
  const handleAddTocart = () => {
    if (user) {
      return route.push(ROUTES.shop);
    }
    route.push(ROUTES.login);
  };
  if (!quantity || !price) {
    return <PurchasePanelSkeleton />;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor="white"
      p={2}
      className="border-radius-default"
    >
      {/* Chọn số lượng */}
      <Box display="inline-flex" alignItems="end" gap={2}>
        <Typography color="textSecondary">Số lượng: </Typography>
        <ButtonGroup>
          <Button
            onClick={() => setQuantity(quantity - 1)}
            size="small"
            disabled={quantity === 1}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            disabled
            sx={{
              ":disabled": {
                color: "#0288d1",
                borderColor: "#1976d280",
              },
            }}
          >
            {quantity}
          </Button>
          <Button
            onClick={() => setQuantity(quantity + 1)}
            size="small"
            disabled={quantity === maxQuantity}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Box>

      {/* Tổng giá */}
      <Box color="#f57224" display="inline-flex" gap={1}>
        <Typography variant="h6">Tổng:</Typography>
        <Typography variant="h6">{formatCurrency(quantity * price)}</Typography>
      </Box>

      {/* Hành động */}
      <Box display="inline-flex" justifyContent="space-around">
        <Button
          variant="contained"
          sx={{
            width: "max-content",
            minWidth: "40%",
            bgcolor: "var(--background-default)",
          }}
          onClick={() => route.push(`${ROUTES.buynow}/${productId}`)}
        >
          Buy Now
        </Button>
        <Button
          variant="contained"
          onClick={handleAddTocart}
          sx={{
            width: "max-content",
            minWidth: "40%",
            bgcolor: "var(--background-default)",
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}
