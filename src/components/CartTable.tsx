"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartTable = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Laptop", price: 1500, quantity: 1 },
    { id: 2, name: "Tai nghe", price: 200, quantity: 2 },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [shippingMethod, setShippingMethod] = useState<string>("fast");

  const handleDelete = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handleIncrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleShippingChange = (event: SelectChangeEvent<string>) => {
    setShippingMethod(event.target.value);
  };

  const calculateShippingFee = () => {
    switch (shippingMethod) {
      case "fast":
        return 30000; // Giao hàng nhanh: 30k
      case "economy":
        return 15000; // Giao hàng tiết kiệm: 15k
      case "pickup":
        return 0; // Nhận tại cửa hàng: 0k
      default:
        return 0;
    }
  };

  const calculateTotal = (item: CartItem) => item.price * item.quantity;

  const calculateSelectedTotal = () =>
    cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + calculateTotal(item), 0);

  const calculateSelectedTotalWithShipping = () =>
    calculateSelectedTotal() + calculateShippingFee();

  const handleCheckout = () => {
    // Logic thanh toán (ví dụ chuyển sang trang thanh toán)
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="50vh"
        textAlign="center"
        p={2}
      >
        <Typography variant="h5" gutterBottom>
          Giỏ hàng của bạn đang trống
        </Typography>
        <Typography variant="body1" mb={2}>
          Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
          sx={{ bgcolor: "var(--background-default)" }}
        >
          Quay về Trang chủ
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Giỏ hàng của bạn
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: "#f5f5f5" }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={
                    selectedItems.length === cartItems.length &&
                    cartItems.length > 0
                  }
                  indeterminate={
                    selectedItems.length > 0 &&
                    selectedItems.length < cartItems.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <b>Sản phẩm</b>
              </TableCell>
              <TableCell align="center">
                <b>Số lượng</b>
              </TableCell>
              <TableCell align="center">
                <b>Giá</b>
              </TableCell>
              <TableCell align="center">
                <b>Tổng tiền</b>
              </TableCell>
              <TableCell align="center">
                <b>Xoá</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Box
                    height={"100%"}
                    width={"100%"}
                    display={"flex"}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Button
                      onClick={() => handleDecrease(item.id)}
                      size="small"
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      onClick={() => handleIncrease(item.id)}
                      size="small"
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(calculateTotal(item))}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Tổng tiền và chọn phương thức giao hàng */}
      <Box
        mt={3}
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        flexDirection={"column"}
        gap={2}
        sx={{ alignItems: "flex-end" }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Phương thức giao hàng:</Typography>
          <Select
            value={shippingMethod}
            onChange={handleShippingChange}
            size="small"
          >
            <MenuItem value="fast">Giao hàng nhanh - 30.000₫ </MenuItem>
            <MenuItem value="economy">Giao hàng tiết kiệm - 15.000₫</MenuItem>
            <MenuItem value="pickup">Nhận tại cửa hàng - 0₫</MenuItem>
          </Select>
        </Box>

        <Box textAlign="right">
          <Typography variant="h6">
            Tổng cộng ({selectedItems.length} sản phẩm chọn):{" "}
            {formatCurrency(calculateSelectedTotalWithShipping())}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            (Đã bao gồm phí giao hàng: {formatCurrency(calculateShippingFee())})
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
            sx={{ mt: 1 }}
          >
            Thanh toán
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartTable;
