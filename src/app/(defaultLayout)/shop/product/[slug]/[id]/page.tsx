"use client";

import { Box, Grid, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";
import Carousell from "@/components/Carousel";
import ListProducts from "@/components/ListProduct";
import ProductIntroduction from "@/components/ProductIntroduction";
import PurchasePanel from "@/components/PurchasePanel";

import { useCallAPI } from "@/hooks/useCallAPI";
import ROUTES from "@/routes/routes";

const API = `${process.env.API_URL}/api/products?`;

const ListProduct = [
  "Demo.webp",
  "Ao.jpg",
  "Demo.webp",
  "Ao.jpg",
  "Background.png",
  "Ao.jpg",
  "Demo.webp",
  "Background.png",
  "Demo.webp",
  "Ao.jpg",
  "Demo.webp",
  "Ao.jpg",
  "Background.png",
  "Ao.jpg",
  "Demo.webp",
  "Background.png",
];

function ViewDetailsProduct({ params }: { params: Promise<{ id: string }> }) {
  const path = usePathname();

  const [idProduct, setIdProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Gọi API lấy chi tiết sản phẩm theo ID
  const { data } = useCallAPI(idProduct ? `${API}id=${idProduct}` : null);

  // Gọi API lấy các sản phẩm trong cùng danh mục
  const ProductsInCategory = useCallAPI(
    data?.data[0]?.categoryId
      ? `${API}categoryId=${data?.data[0]?.categoryId}`
      : null
  );

  useEffect(() => {
    (async () => {
      const { id } = await params;
      setIdProduct(id);
    })();
  }, [params]);
  const listProducts = useMemo(() => {
    return ProductsInCategory.data?.data.filter(
      (item: Products) => item.productId !== data?.data[0]?.productId
    );
  }, [ProductsInCategory.data?.data, data?.data]);

  const LinkPath = useMemo(() => {
    return path
      .split("/")
      .splice(1, path.split("/").length - 2)
      .filter((item) => item !== "product") as (keyof typeof ROUTES)[];
  }, [path]);

  const listMenu = useMemo(
    () => ["home", ...LinkPath] as Array<keyof typeof ROUTES>,
    [LinkPath]
  );

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs listMenu={listMenu} />
      <br />

      {/* Grid layout 3 cột: hình ảnh - mô tả - thanh toán */}
      <Grid
        display="grid"
        gridTemplateColumns={{ md: "repeat(3, 1fr)", xs: "repeat(1, 1fr)" }}
        gap={2}
      >
        {/* Cột 1: Hình ảnh sản phẩm */}
        <Box bgcolor="white" p={2} className="border-radius-default">
          <Carousell Images={ListProduct} />
        </Box>

        {/* Cột 2: Mô tả sản phẩm */}
        <Box bgcolor="white" p={2} className="border-radius-default">
          <ProductIntroduction data={data?.data[0]} />
        </Box>

        {/* Cột 3: Thanh toán & địa chỉ */}
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          bgcolor="white"
          className="border-radius-default"
        >
          <PurchasePanel
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={data?.data[0]?.stock}
            price={data?.data[0]?.price}
            productId={idProduct}
          />
        </Box>
      </Grid>

      {/* Đánh giá sản phẩm */}
      <Box bgcolor="white" p={2} className="border-radius-default">
        Đánh giá
      </Box>
      <br />

      {/* Các sản phẩm tương tự */}
      <Typography
        variant="h6"
        bgcolor="white"
        p={2}
        className="border-radius-default"
        textAlign="center"
        color="var(--background-default)"
      >
        Các sản phẩm tương tự
      </Typography>

      <Box>
        <br />
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(7, 1fr)",
          }}
          gap={3}
        >
          <ListProducts listProducts={listProducts} />
        </Box>
      </Box>
    </>
  );
}

export default ViewDetailsProduct;
