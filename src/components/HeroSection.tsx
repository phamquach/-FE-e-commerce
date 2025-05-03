import ROUTES from "@/routes/routes";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function HeroSection() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        fontFamily={"var(--font-header-default) !important"}
        sx={{
          fontWeight: "bold",
          color: "#2A0066",
          mb: 2,
        }}
      >
        Mua Sắm Thiết Bị Điện Tử Dễ Dàng như Xếp Hình
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(50, 50, 50, 1)",
          fontSize: "1.1rem",
          mb: 4,
        }}
      >
        Chúng tôi mang đến giải pháp đơn giản và hiện đại giúp bạn tiếp cận các
        thiết bị điện tử chất lượng cao một cách nhanh chóng và thuận tiện.
      </Typography>

      <Box>
        <Link href={ROUTES.login}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#25dac5",
              borderRadius: "999px",
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Khám Phá Ngay
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
