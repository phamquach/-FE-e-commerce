"use client";
import { convertSpaceToDash, formatCurrency } from "@/lib";
import ROUTES from "@/routes/routes";
import { Theme } from "@emotion/react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Card,
  CardContent,
  Grid,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function ListProducts({
  listProducts,
  sx,
}: {
  listProducts: Array<Products>;
  sx?: SxProps<Theme>;
}) {
  return (
    <>
      {listProducts?.map((product) => (
        <Grid
          sx={{ ...sx, cursor: "pointer" }}
          className="animate-shadow"
          key={product.name}
          component={Link}
          href={`${ROUTES.product}/${convertSpaceToDash(product.name)}/${product.productId}`}
        >
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { sm: 120, xs: 70 },
              }}
            >
              <Image
                src="/Background.png"
                alt="Product 1"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 600px) 100vw, 600px"
                priority
              />
            </Box>
            <CardContent sx={{ px: 0, paddingBottom: "0 !important" }}>
              <Typography variant="body2" color="textSecondary">
                {product.name}
              </Typography>
              <Typography
                variant="subtitle2"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                color="primary"
                sx={{ mt: 1 }}
              >
                {formatCurrency(product.price)}
                <Tooltip title="Thêm vào giỏ hàng">
                  <AddShoppingCartIcon
                    sx={{ cursor: "pointer" }}
                    fontSize="small"
                  />
                </Tooltip>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}
