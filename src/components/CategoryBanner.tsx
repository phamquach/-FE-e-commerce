"use client";
import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes/routes";

interface Category {
  categoryId: number;
  name: string;
  img: string;
}

export default function CategoryBanner({
  categories = [],
}: {
  categories?: Array<Category>;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(true);
  const router = useRouter();
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (

      <Box
        sx={{
          p: { xs: 1, sm: 2 },
          bgcolor: "#f5f5f5",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          DANH MỤC
        </Typography>

        {/* Arrow Buttons */}
        {showLeft && (
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              zIndex: 1,
              bgcolor: "white",
              boxShadow: 1,
              "&:hover": { bgcolor: "grey.200" },
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        {showRight && (
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              zIndex: 1,
              bgcolor: "white",
              boxShadow: 1,
              "&:hover": { bgcolor: "grey.200" },
              display: { xs: "none", sm: "flex" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}

        {/* Category List */}
        <Box
          ref={scrollRef}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gridAutoRows: "auto",
            overflowX: "auto",
            pb: 2,
            px: { xs: 1, sm: 0 },
            scrollBehavior: "smooth",
            gap: { xs: 1.5, sm: 2 },
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((category) => (
            <Box
              onClick={() =>
                router.push(
                  `${ROUTES.category}/${category.name.replace(/\s+/g, "&")}/${category.categoryId}`
                )
              }
              key={category.categoryId}
              sx={{
                flex: { xs: "0 0 30%", sm: "0 0 10%" },
                textAlign: "center",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 1,
                p: 2,
                transition: "all 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 3 },
                minWidth: { xs: 100, sm: 120 },
                maxWidth: { xs: 120, sm: 150 },
              }}
            >
              <Image
                width={60}
                height={60}
                src={
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                }
                alt={category.name}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 1,
                }}
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "Demo.webp";
                }}
              />
              <Typography variant="body2" fontSize={{ xs: 10, sm: 12 }} noWrap>
                {category.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
  );
}
