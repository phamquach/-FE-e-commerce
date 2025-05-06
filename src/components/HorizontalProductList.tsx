"use client";
import { convertSpaceToDash, formatCurrency } from "@/lib";
import ROUTES from "@/routes/routes";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Sản phẩm 1",
    description: "Mô tả ngắn sản phẩm 1",
    image: "Demo.webp",
    price: 100000,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    description: "Mô tả ngắn sản phẩm 2",
    image: "Demo.webp",
    price: 200000,
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    description: "Mô tả ngắn sản phẩm 3",
    image: "Demo.webp",
    price: 300000,
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    description: "Mô tả ngắn sản phẩm 4",
    image: "Demo.webp",
    price: 400000,
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    description: "Mô tả ngắn sản phẩm 5",
    image: "Demo.webp",
    price: 500000,
  },
  {
    id: 6,
    name: "Sản phẩm 1",
    description: "Mô tả ngắn sản phẩm 1",
    image: "Demo.webp",
    price: 100000,
  },
  {
    id: 7,
    name: "Sản phẩm 2",
    description: "Mô tả ngắn sản phẩm 2",
    image: "Demo.webp",
    price: 200000,
  },
  {
    id: 8,
    name: "Sản phẩm 3",
    description: "Mô tả ngắn sản phẩm 3",
    image: "Demo.webp",
    price: 300000,
  },
  {
    id: 9,
    name: "Sản phẩm 4",
    description: "Mô tả ngắn sản phẩm 4",
    image: "Demo.webp",
    price: 400000,
  },
  {
    id: 10,
    name: "Sản phẩm 5",
    description: "Mô tả ngắn sản phẩm 5",
    image: "Demo.webp",
    price: 500000,
  },
];

export default function HorizontalProductList() {
  return (
    <Box
      sx={{
        bgcolor: '#e4eeeeb0',
        overflowX: "auto",
        whiteSpace: "nowrap",
        p: 2,
        border: "1px solid white",
        borderRadius: 2,
        display: "flex",
        gap: 2,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {products.map((product) => (
        <Box
          component={Link}
          href={`${ROUTES.product}/${convertSpaceToDash(product.name)}/${product.id}`}
          key={product.id}
          className="parent-animate-scale"
          sx={{
            flex: "0 0 auto",
            width: { sm: 200, xs: "auto" },
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 4,
            textAlign: "left",
            p: 2,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 120,
              mb: 1,
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <Image
              className="animate-scale"
              src={"/" + product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="200px"
            />
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography variant="subtitle2" color="primary">
              {formatCurrency(product.price)}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
