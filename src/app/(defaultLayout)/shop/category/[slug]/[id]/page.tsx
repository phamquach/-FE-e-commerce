"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ROUTES from "@/routes/routes";
import { convertSlugToText } from "@/lib";
import { Box, Typography } from "@mui/material";
import { useCallAPI } from "@/hooks/useCallAPI";
import ListProducts from "@/components/ListProduct";
import Breadcrumbs from "@/components/Breadcrumbs";
import RangeSlider from "@/components/ProductFilterByPrice";

const API = `${process.env.API_URL}/api/products?categoryId=`;
export default function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const [value, setData] = useState<{ id: string; slug: string }>();
  const result = useCallAPI(value ? API + `${value?.id}` : null);
  const path = usePathname();
  useEffect(() => {
    params.then((res) => setData(res));
  }, [params]);

  const LinkPath = useMemo(() => {
    return path
      .split("/")
      .splice(1, path.split("/").length - 2)
      .filter((item) => item !== "category") as (keyof typeof ROUTES)[];
  }, [path]);

  const listMenu = useMemo(
    () => ["home", ...LinkPath] as Array<keyof typeof ROUTES>,
    [LinkPath]
  );
  return (
    <>
      <Breadcrumbs listMenu={listMenu} />
      <br />
      <Typography variant="h5" className="title">
        {convertSlugToText(value?.slug)}
      </Typography>
      <br />
      <Box className="title">
        <Typography variant="h5">Loc San Pham Theo Giá</Typography>
        <RangeSlider />
      </Box>
      <br />
      {/* List Products */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "repeat(2, 1fr)", sm: "repeat(5, 1fr)" }}
        gap={3}
        bgcolor={"white"}
        borderRadius={2}
        p={2}
      >
        <ListProducts listProducts={result.data?.data} />
      </Box>
    </>
  );
}
