"use client";

import React, { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";

import PopupCustomer from "@/components/PopupCustomer";
import CartItem from "@/components/CartItem";
import { useCallAPI } from "@/hooks/useCallAPI";
import { isAllFieldsNotNull } from "@/lib";

function BuyNow({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const id = use(params).id;

  const result = useCallAPI(`${process.env.API_URL}/api/products?id=${id}`);
  const products: Products | null = useMemo(() => {
    return result.data?.data[0] ?? null;
  }, [result]);

  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<userInformationBuy>({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Container maxWidth="sm">
      {/* Back */}
      <IconButton
        sx={{ ":hover": { bgcolor: "transparent" } }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ bgcolor: "white", p: 2, borderRadius: 4 }}>
        {/* Thông tin nhận hàng */}
        <Box onClick={handleModal} sx={{ cursor: "pointer" }} minHeight={100}>
          {isAllFieldsNotNull<userInformationBuy>(userData) ? (
            <Box>
              <Typography>
                <PersonIcon fontSize="inherit" color="info" sx={{ pr: 1 }} />
                <span>{userData.name}</span>
              </Typography>
              <Typography>
                <LocalPhoneIcon
                  fontSize="inherit"
                  color="action"
                  sx={{ pr: 1 }}
                />
                <span>{userData.phone}</span>
              </Typography>
              <Typography>
                <LocationPinIcon
                  fontSize="inherit"
                  color="error"
                  sx={{ pr: 1 }}
                />
                <span>{userData.address}</span>
              </Typography>
            </Box>
          ) : (
            <Typography
              color="info"
              sx={{ ":hover": { textDecoration: "underline" } }}
            >
              Vui lòng cung cấp đầy đủ thông tin nhận hàng
            </Typography>
          )}
        </Box>

        <PopupCustomer
          open={openModal}
          onclose={handleModal}
          handleData={(data: userInformationBuy) => setUserData(data)}
          userData={userData}
        />

        <hr />

        {/* Thông tin đơn hàng */}
        {products && (
          <CartItem
            image="/Demo.webp"
            name={products.name}
            price={products.price ?? 0}
            quantity={userData.quantity ?? 1}
            onChangeQuantity={(newQty: number) => {
              if (newQty <= products.stock) {
                setUserData((prev) => ({ ...prev, quantity: newQty }));
              } else {
                setUserData((prev) => ({ ...prev, quantity: products.stock }));
              }
            }}
          />
        )}

        {/* Mua hàng */}
        <Box textAlign="end" mt={3}>
          <Button
            variant="contained"
            sx={{ bgcolor: "var(--background-default)" }}
            disabled={!isAllFieldsNotNull<userInformationBuy>(userData)}
          >
            Buy Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default BuyNow;
