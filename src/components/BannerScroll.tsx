"use client";
import { Box, Card } from "@mui/material";
import { useEffect, useRef } from "react";

const banners = ["Background.png", "Demo.webp"];

export default function BannerScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const nextScroll =
        container.scrollLeft + container.clientWidth >= container.scrollWidth
          ? 0
          : container.scrollLeft + container.clientWidth;

      container.scrollTo({
        left: nextScroll,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (

      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          gap: 2,
          px: 2,
          py: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {banners.map((src, index) => (
          <Card
            key={index}
            sx={{
              position: "relative",
              minWidth: "100%",
              maxWidth: { xs: "98%", sm: "100%" },
              maxHeight: 300,
              flexShrink: 0,
              borderRadius: 5,
              boxShadow: 5,
              scrollSnapAlign: "start",
              overflow: "hidden",
            }}
          >
            <Box
              component={"img"}
              src={`/${src}`}
              alt={`Banner ${index + 1}`}
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        ))}
      </Box>
  );
}
