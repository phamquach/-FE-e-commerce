"use client";
import ListProducts from "@/components/ListProduct";
import { useCallAPI } from "@/hooks/useCallAPI";
import { convertSlugToText } from "@/lib";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export default function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const [value, setData] = useState<{ id: string; slug: string }>();
  const result = useCallAPI(
    value ? `${process.env.API_URL}/api/products?categoryId=${value?.id}` : null
  );
  useEffect(() => {
    params.then((res) => setData(res));
  }, [params]);
  return (
    <Container>
      <Typography variant="h5">{convertSlugToText(value?.slug)}</Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }}
        gap={3}
      >
        <ListProducts listProducts={result.data?.data} />
      </Box>
    </Container>
  );
}
