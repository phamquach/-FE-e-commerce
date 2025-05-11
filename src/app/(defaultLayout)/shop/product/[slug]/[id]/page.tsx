"use client";
import { Box, Grid, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import AddressSearchModal from "@/components/AddressSearchModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Carousell from "@/components/Carousel";
import ProductIntroduction from "@/components/ProductIntroduction";
import PurchasePanel from "@/components/PurchasePanel";
import { useCallAPI } from "@/hooks/useCallAPI";
import ROUTES from "@/routes/routes";
import ListProducts from "@/components/ListProduct";

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
];

function ViewDetailsProduct({ params }: { params: Promise<{ id: string }> }) {
  const path = usePathname();

  const [idProduct, setIdProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [addressInfo, setAddressInfo] = useState({
    open: false,
    selected: "Chọn địa chỉ giao hàng",
  });

  const { data } = useCallAPI(idProduct ? `${API}id=${idProduct}` : null);
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

  const handleSelectAddress = (addr: string) => {
    setAddressInfo((prev) => ({ ...prev, selected: addr, open: false }));
  };

  return (
    <>
      <Breadcrumbs
        listMenu={[
          "home",
          ...(path
            .split("/")
            .slice(1, -1)
            .filter((item) => item !== "product") as (keyof typeof ROUTES)[]),
        ]}
      />

      <br />

      <Grid
        display={"grid"}
        gridTemplateColumns={{ md: "repeat(3,1fr)", xs: "repeat(1,1fr)" }}
        gap={2}
      >
        {/* Cột 1: Hình ảnh */}
        <Box bgcolor="white" p={2} className="border-radius-default">
          <Carousell Images={ListProduct} />
        </Box>

        {/* Cột 2: Giới thiệu */}
        <Box bgcolor="white" p={2} className="border-radius-default">
          <ProductIntroduction data={data?.data[0]} />
        </Box>

        {/* Cột 3: Địa chỉ & mua hàng */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          bgcolor="white"
          p={2}
          className="border-radius-default"
        >
          <PurchasePanel
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={data?.data[0]?.stock}
            price={data?.data[0]?.price}
            address={addressInfo.selected}
            onAddressClick={() =>
              setAddressInfo((prev) => ({ ...prev, open: true }))
            }
          />
        </Box>
      </Grid>

      {/* Modal chọn địa chỉ */}
      <AddressSearchModal
        open={addressInfo.open}
        onClose={() => setAddressInfo((prev) => ({ ...prev, open: false }))}
        onSelect={handleSelectAddress}
      />
      <br />

      {/* Đánh giá */}
      <Box bgcolor={"white"} p={2} className="border-radius-default">
        Đánh giá
      </Box>
      <br />

      {/* Các sản phầm tương tự */}
      <Typography
        variant="h6"
        bgcolor={"white"}
        p={2}
        className="border-radius-default"
        textAlign={"center"}
        color="var(--background-default)"
      >
        Các sản phẩm tương tự
      </Typography>
      <Box>
        <br />
        <Box
          display={"grid"}
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(7, 1fr)",
          }}
          gap={3}
        >
          <ListProducts
            listProducts={ProductsInCategory.data?.data.filter(
              (item: Products) => item.productId != data?.data[0]?.productId
            )}
          />
        </Box>
      </Box>
    </>
  );
}

export default ViewDetailsProduct;
