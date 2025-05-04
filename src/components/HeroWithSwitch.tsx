import FadeIn from "@/animation/fadeIn";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";

const slides = [
  {
    title: "Tùy chỉnh theo thương hiệu",
    desc: "Dễ dàng tùy chỉnh màu sắc, bố cục, banner theo phong cách riêng mà không cần viết code.",
    img: "Background.png",
  },
  {
    title: "Quản lý đơn hàng thông minh",
    desc: "Theo dõi tồn kho, đơn hàng, khách hàng và doanh thu một cách trực quan và tiện lợi.",
    img: "Background.png",
  },
  {
    title: "Bán hàng điện tử dễ dàng",
    desc: "Tạo cửa hàng cho laptop, điện thoại, phụ kiện với giao diện hiện đại, dễ dùng và không cần kỹ thuật.",
    img: "Background.png",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1: xuống, -1: lên

  const handleDotClick = (newIndex: number) => {
    if (newIndex === index) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      if (index === slides.length - 1) {
        setIndex(0);
        setDirection(-1);
        return;
      }
      setIndex((i) => i + 1);
      setDirection(1);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <FadeIn initial={{ opacity: 0, y: 50 }}>
      <Container maxWidth="lg" sx={{ py: 10, textAlign:'start' }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent={"space-between"}
          flexWrap={"nowrap"}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
          {/* Cột 1: Nút tròn */}
          <Grid>
            <Stack
              spacing={1}
              sx={{
                flexDirection: { xs: "row", sm: "column" },
                gap: 1,
              }}
            >
              {slides.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => handleDotClick(i)}
                  sx={{
                    marginTop: "0 !important",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor:
                      i === index ? "#e91e63" : "rgba(50, 50, 50, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </Stack>
          </Grid>

          {/* Cột 2: Nội dung */}
          <Grid sx={{ maxWidth: { sm: "55%", xs: "100%" } }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: direction === 1 ? 100 : -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: direction === 1 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  fontFamily={"var(--font-header-default) !important"}
                  gutterBottom
                >
                  {slides[index].title}
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  {slides[index].desc}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "999px", bgcolor: "#25dac5" }}
                >
                  Mua ngay
                </Button>
              </motion.div>
            </AnimatePresence>
          </Grid>

          {/* Cột 3: Hình ảnh */}
          <Grid>
            <AnimatePresence mode="wait">
              <div style={{ perspective: 800 }}>
                <motion.img
                  key={index}
                  src={slides[index].img}
                  alt="Slide"
                  style={{
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: "20px",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
                  }}
                  initial={{
                    y: direction === 1 ? 100 : -100,
                    opacity: 0,
                  }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction === 1 ? -100 : 100, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </Container>
    </FadeIn>
  );
}
