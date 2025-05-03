"use client";

import { convertSlugToText } from "@/lib";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export default function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const [data, setData] = useState<{ id: string; slug: string } | null>(null);

  useEffect(() => {
    params.then((res) => setData(res));
  }, [params]);
  return (
    <Container>
      <Typography variant="h5">{convertSlugToText(data?.slug)}</Typography>
      <h2>ID {data?.id}</h2>
    </Container>
  );
}
