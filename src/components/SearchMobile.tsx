import { KeyboardEvent, useState } from "react";
import { formatCurrency } from "@/lib";
import ROUTES from "@/routes/routes";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  showResult: boolean;
  setShowResult: (show: boolean) => void;
  value: string;
  setValue: (val: string) => void;
  result: Products[];
}

function SearchMobile({
  showResult,
  setShowResult,
  value,
  setValue,
  result,
}: IProps) {
  const [openSearch, setOpenSearch] = useState(false);
  const route = useRouter();

  const handleFocus = () => {
    setOpenSearch(true);
    setShowResult(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replaceAll(".", ""));
  };

  const handleClear = () => {
    setValue("");
  };

  const closeSearch = () => {
    setOpenSearch(false);
    setShowResult(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, query: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query);
    }
  };

  const handleSearch = (query: string) => {
    if (!query) {
      return;
    }
    closeSearch();
    route.push(`${ROUTES.search}?q=${query}`);
  };

  return (
    <Box
      sx={{
        flex: 1,
        position: openSearch ? "fixed" : "relative",
        inset: 0,
        zIndex: 99,
        bgcolor: openSearch ? "#6a686496" : "transparent",
      }}
    >
      <ClickAwayListener onClickAway={closeSearch}>
        <Box>
          <TextField
            focused={false}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={(e) => handleKeyDown(e, value)}
            placeholder="Tìm kiếm sản phẩm..."
            variant="outlined"
            size={openSearch ? "medium" : "small"}
            fullWidth
            sx={{ bgcolor: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start" onClick={() => handleSearch(value)}>
                    <SearchIcon color="action" />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {showResult && (
            <Box
              position="absolute"
              width="100%"
              maxHeight="45dvh"
              overflow="auto"
              bgcolor="white"
              p={3}
              pt={1}
              borderRadius={1}
              boxShadow="rgba(0, 0, 0, 0.3) 0px 4px 10px"
              display="flex"
              flexDirection="column"
              gap={2}
              textAlign="center"
              zIndex={10}
              boxSizing="border-box"
            >
              {result.length === 0 ? (
                <>Không tìm thấy sản phẩm!</>
              ) : (
                result.map((item) => (
                  <Box
                    key={item.productId}
                    component={Link}
                    href={`${ROUTES.product}/${item.name.replaceAll(" ", "-")}/${item.productId}`}
                    onClick={closeSearch}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    py={1}
                    bgcolor="#f3f2f26e"
                    borderRadius={1}
                  >
                    <Image
                      src="/Ao.jpg"
                      alt={item.name}
                      width={100}
                      height={80}
                      sizes="100px"
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                    <Box textAlign="left">
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="subtitle1" color="error">
                        {formatCurrency(item.price)}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
}

export default SearchMobile;
