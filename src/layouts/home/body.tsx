import BannerScroll from "@/components/BannerScroll";
import DemoProduct from "@/components/DemoProduct";
import HeroSection from "@/components/HeroSection";
import HeroWithSwitch from "@/components/HeroWithSwitch";
import ListProducts from "@/components/ListProduct";
import { Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function Content() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <HeroSection />
      <br />
      <BannerScroll />
      <HeroWithSwitch />
      {/* Product Section */}
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mt: 6 }}
        fontFamily={"var(--font-header-default) !important"}
      >
        Featured Products
      </Typography>
      <Grid
        display={"grid"}
        gridTemplateColumns={{ sm: "repeat(5, 1fr)", xs: "repeat(2, 1fr)" }}
        gap={3}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <ListProducts listProducts={[]} />
      </Grid>

      <Link href={""} className="text-underline">
        Xem Thêm &gt;&gt;
      </Link>

      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mt: 6 }}
        fontFamily={"var(--font-header-default) !important"}
      >
        New Collections
      </Typography>
      <Grid
        display={"grid"}
        gridTemplateColumns={{ sm: "repeat(5, 1fr)", xs: "repeat(2, 1fr)" }}
        gap={3}
        sx={{ mt: 2, justifyContent: "center" }}
      >
        <ListProducts listProducts={[]} />
      </Grid>

      <Link href={""} className="text-underline">
        Xem Thêm &gt;&gt;
      </Link>
      <DemoProduct />
      <DemoProduct reverse={true} />
      <DemoProduct />
    </Container>
  );
}
