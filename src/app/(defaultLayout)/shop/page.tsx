"use client";
import BannerScroll from "@/components/BannerScroll";
import CategoryBanner from "@/components/CategoryBanner";
import CategorySkeleton from "@/components/CategorySkeleton";
import HorizontalProductList from "@/components/HorizontalProductList";
import ListProducts from "@/components/ListProduct";
import { useCallAPI } from "@/hooks/useCallAPI";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function Shop() {
  const categories = useCallAPI(`${process.env.API_URL}/api/categories`);
  const products = useCallAPI(`${process.env.API_URL}/api/products`);
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {categories.isLoading ? (
        <CategorySkeleton />
      ) : (
        <CategoryBanner categories={categories.data?.data} />
      )}
      <BannerScroll />

        <Typography variant="h5">Sản phẩm nổi bật</Typography>

      <Box>
        <HorizontalProductList />
      </Box>
      {/* Phone  */}
      <React.Fragment>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">Điện thoại</Typography>
            <Link href={"#"} className="text-underline">
              Xem thêm -&gt;
            </Link>
          </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "repeat(2, 1fr)", sm: "repeat(5, 1fr)" }}
          gap={3}
        >
          <ListProducts listProducts={products.data?.data} />
        </Box>
      </React.Fragment>
      {/* Laptop */}
      <React.Fragment>

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">Laptop</Typography>
            <Link href={"#"} className="text-underline">
              Xem thêm -&gt;
            </Link>
          </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "repeat(2, 1fr)", sm: "repeat(6, 1fr)" }}
          gap={3}
        >
          <ListProducts listProducts={products.data?.data} />
        </Box>
      </React.Fragment>
    </Container>
  );
}

export default Shop;
