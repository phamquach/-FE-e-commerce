"use client";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function DemoProduct({
  reverse = false,
}: {
  reverse?: boolean;
}) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const controls = useAnimation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollDirection === "down") {
      controls.start({ rotateY: isMobile ? 0 : reverse ? 40 : -40 });
    } else if (scrollDirection === "up") {
      controls.start({ rotateY: isMobile ? 0 : reverse ? -40 : 40 });
    }
  }, [scrollDirection, controls, reverse, isMobile]);

  return (
    <Box
      display="flex"
      flexDirection={{
        xs: "column",
        sm: reverse ? "row-reverse" : "row",
      }}
      alignItems="center"
      justifyContent="space-between"
      p={4}
      sx={{ overflow: "hidden" }}
      gap={2}
    >
      {/* Thông tin sản phẩm */}
      <Box flex={1} pr={{ sm: 4 }} textAlign={{ xs: "center", sm: "left" }}>
        <Typography
          variant="h4"
          fontFamily={"var(--font-header-default) !important"}
          gutterBottom
        >
          Amazing Product
        </Typography>
        <Typography variant="body1" paragraph>
          This is an amazing product with incredible features. It is designed to
          make your life easier and more enjoyable. Don&apos;t miss out on this
          opportunity to own it!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ bgcolor: "#25dac5" }}
        >
          Buy Now
        </Button>
      </Box>

      {/* Hình ảnh sản phẩm */}
      <Box
        flex={1}
        display="flex"
        justifyContent={reverse ? "start" : "end"}
        sx={{ perspective: "1000px" }}
      >
        <motion.img
          src="Background.png"
          alt="Product"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, .7)",
          }}
          animate={controls}
          transition={{ type: "spring", stiffness: 20, damping: 20 }}
        />
      </Box>
    </Box>
  );
}
