"use client";
import BannerScroll from "@/components/BannerScroll";
import CategoryBanner from "@/components/CategoryBanner";
import CategorySkeleton from "@/components/CategorySkeleton";
import HorizontalProductList from "@/components/HorizontalProductList";
import { Box, Typography } from "@mui/material";
import { useCallAPI } from "@/hooks/useCallAPI";
import ListProducts from "@/components/ListProduct";

function Shop() {
  const categories = useCallAPI(`${process.env.API_URL}/api/categories`);
  const products = useCallAPI(`${process.env.API_URL}/api/products`);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {categories.isLoading ? (
        <CategorySkeleton />
      ) : (
        <CategoryBanner categories={categories.data?.data} />
      )}
      <BannerScroll />
      <Typography variant="h5" className="title">
        Sản phẩm nổi bật
      </Typography>
      <Box>
        <HorizontalProductList />
      </Box>

      <Typography variant="h5" textAlign={"center"} className="title">
        Dành cho bạn
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(7, 1fr)",
        }}
        gap={3}
        p={2}
        borderRadius={2}
      >
        <ListProducts listProducts={products.data?.data} />
      </Box>
    </Box>
  );
}

export default Shop;
