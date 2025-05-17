import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib";
import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface CartItemProps {
  image: string;
  name: string;
  price: number;
  quantity: number;
  onChangeQuantity: (value: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  price,
  quantity,
  onChangeQuantity,
}) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onChangeQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onChangeQuantity(quantity + 1);
    console.log(quantity);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      p={2}
      borderBottom="1px solid #e0e0e0"
    >
      {/* Sản phẩm */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* Hình ảnh */}
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          style={{ borderRadius: 8 }}
        />

        {/* Thông tin sản phẩm */}
        <Box flex={1} ml={2}>
          <Typography fontWeight={600}>{name}</Typography>
          <Box mt={1}>
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{
                background: "#f5f5f5",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontSize: "0.875rem",
              }}
            >
              {formatCurrency(price)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Số lượng và xoá */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <Box
          display="flex"
          alignItems="center"
          border="1px solid #ccc"
          borderRadius={2}
          overflow="hidden"
        >
          <IconButton onClick={handleDecrease}>
            <Remove fontSize="small" />
          </IconButton>
          <Typography px={1}>{quantity}</Typography>
          <IconButton onClick={handleIncrease}>
            <Add fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Tạm tính */}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography fontWeight={500}>
          Tạm tính ({quantity} sản phẩm):
        </Typography>
        <Typography fontWeight={500}>
          {formatCurrency(price * quantity)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItem;
