import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton } from "@mui/material";
import BasicModal from "./Modal";

function Carousell({ Images }: { Images: string[] }) {
  const [index, setIndex] = useState<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [openModalViewImg, setOpenModalViewImg] = useState<boolean>(false);

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

  useEffect(() => {
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
    <Box height={"max-content"}>
      <BasicModal
        openModal={openModalViewImg}
        setOpenModal={() => setOpenModalViewImg(false)}
        src={`/${Images[index]}`}
        alt={`Hình ${index}`}
      />
      {/* Image */}
      <Box
        height={250}
        position={"relative"}
        mb={2}
        sx={{ cursor: "zoom-in" }}
        onClick={() => setOpenModalViewImg(true)}
      >
        <Image
          src={`/${Images[index]}`}
          alt={`Hình ${index}`}
          fill
          style={{ objectFit: "contain" }}
          priority
          sizes="400px"
        />
      </Box>

      <Box position={"relative"}>
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
        <Box
          display={"flex"}
          overflow={"scroll"}
          ref={scrollRef}
          width={"100%"}
          gap={1}
          sx={{
            scrollbarWidth: "none",
          }}
        >
          {Images.map((item, _index) => (
            <Box
              key={_index}
              flexShrink={0}
              sx={{
                width: "15%",
                p: "2px",
                borderRadius: 1,
                border:
                  _index === index
                    ? "2px solid var(--background-default)"
                    : "2px solid transparent",
                transition: "border 0.3s",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "var(--background-default)",
                },
              }}
              onMouseEnter={() => setIndex(_index)}
            >
              <Box width="100%" height={50} position="relative">
                <Image
                  src={`/${item}`}
                  alt={`Hình ${_index + 1}`}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  sizes="100px"
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Carousell;
