"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Carousell from "@/components/Carousel";
import { useCallAPI } from "@/hooks/useCallAPI";
import ROUTES from "@/routes/routes";
import { Box, Grid } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API = `${process.env.API_URL}/api/products?id=`;
const ListProduct = [
  "Demo.webp",
  "Ao.jpg",
  "Demo.webp",
  "Background.png",
  "Demo.webp",
  "Background.png",
];
function ViewDetailsProduct({ params }: { params: Promise<{ id: string }> }) {
  const path = usePathname();
  const [idProduct, setIdProduct] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useCallAPI(idProduct ? `${API}${idProduct}` : null);
  useEffect(() => {
    params.then((res) => setIdProduct(res.id));
  }, [params]);
  return (
    <>
      <Breadcrumbs
        listMenu={[
          "home",
          ...(path
            .split("/")
            .splice(1, path.split("/").length - 2)
            .filter((item) => item !== "product") as (keyof typeof ROUTES)[]),
        ]}
      />
      <Grid
        display={"grid"}
        gridTemplateColumns={{ sm: "repeat(3,1fr)", xs: "repeat(1,1fr)" }}
        gap={2}
      >
        <Box
          bgcolor={"white"}
          height={"max-content"}
          p={2}
          className="border-radius-default"
        >
          <Carousell Images={ListProduct} />
        </Box>
        <Box
          p={2}
          bgcolor={"white"}
          height={"1000px"}
          className="border-radius-default"
        >
          Hello
        </Box>
        <Box
          p={2}
          bgcolor={"white"}
          height={"200px"}
          className="border-radius-default"
        >
          Hello
        </Box>
      </Grid>
    </>
  );
}

export default ViewDetailsProduct;
