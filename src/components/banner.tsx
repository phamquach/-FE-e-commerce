"use client";
import ROUTES from "@/routes/routes";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

export default function Banner() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return <></>;
  }
  return (
    <Box>
      <AppBar
        position="static"
        color="primary"
        sx={{
          bgcolor: "#25dac5",
          overflow: "hidden",
          maxHeight: "max-content",
          transition: "all 0.5s ease",
          height: "100%",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          <Link href={ROUTES.home} style={{ color: "white", flex: 1 }}>
            <Box
              sx={{
                color: "white",
                textAlign: "center",
                pb: 1,
              }}
            >
              <Container maxWidth="md">
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="bold"
                  mb={2}
                  fontFamily={"var(--font-header-default) !important"}
                >
                  Sky-Computer
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  fontWeight="300"
                  fontFamily={"var(--font-header-default) !important"}
                >
                  Nơi cung cấp những sản phẩm công nghệ hiện đại nhất, giá cả
                  hợp lý và dịch vụ tận tâm.
                </Typography>
              </Container>
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
