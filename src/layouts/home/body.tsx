"use client";
import Link from "next/link";
import DemoProduct from "@/components/DemoProduct";
import HeroSection from "@/components/HeroSection";
import ListProducts from "@/components/ListProduct";
import BannerScroll from "@/components/BannerScroll";
import HeroWithSwitch from "@/components/HeroWithSwitch";
import { useCallAPI } from "@/hooks/useCallAPI";
import { Container, Grid, Typography } from "@mui/material";

export default function Content() {
  const products = useCallAPI(`${process.env.API_URL}/api/products`);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
      <HeroSection />
      <br />
      <BannerScroll />
      <HeroWithSwitch />
      <DemoProduct reverse={true} />
      <DemoProduct />
      <DemoProduct reverse={true} />
      {/* Product Section */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mt: 6 }}
        fontFamily={"var(--font-header-default) !important"}
        className="title"
      >
        Featured Products
      </Typography>
      <Grid
        display={"grid"}
        gridTemplateColumns={{ sm: "repeat(5, 1fr)", xs: "repeat(2, 1fr)" }}
        gap={3}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <ListProducts listProducts={products.data?.data} />
      </Grid>

      <Link href={""} className="text-underline">
        <br />
        Xem Thêm &gt;&gt;
      </Link>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mt: 6 }}
        fontFamily={"var(--font-header-default) !important"}
        className="title"
      >
        New Collections
      </Typography>
      <Grid
        display={"grid"}
        gridTemplateColumns={{ sm: "repeat(5, 1fr)", xs: "repeat(2, 1fr)" }}
        gap={3}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <ListProducts listProducts={products.data?.data} />
      </Grid>
      <Link href={""} className="text-underline">
        <br />
        Xem Thêm &gt;&gt;
      </Link>
    </Container>
  );
}
