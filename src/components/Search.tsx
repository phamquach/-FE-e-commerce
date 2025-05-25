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
import { KeyboardEvent } from "react";

interface IProps {
  showResult: boolean;
  setShowResult: (show: boolean) => void;
  value: string;
  setValue: (val: string) => void;
  result: Products[];
}

function Search({
  showResult,
  setShowResult,
  value,
  setValue,
  result,
}: IProps) {
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.replaceAll(".", ""));
  };

  const handleClear = () => {
    setValue("");
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
    setShowResult(false);
    route.push(`${ROUTES.search}?q=${query}`);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowResult(false)}>
      <Box
        sx={{
          maxWidth: 500,
          flex: 1,
          position: "relative",
        }}
      >
        <TextField
          focused={false}
          value={value}
          onChange={handleChange}
          onFocus={() => setShowResult(true)}
          onKeyDown={(e) => handleKeyDown(e, value)}
          placeholder="Tìm kiếm sản phẩm..."
          variant="outlined"
          size="small"
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
            top="100%"
            width="100%"
            maxHeight="calc(100dvh - 180px)"
            bgcolor="white"
            p={3}
            pt={1}
            borderRadius={1}
            boxShadow="rgba(0, 0, 0, 0.3) 0px 4px 10px"
            overflow="auto"
            display="flex"
            flexDirection="column"
            gap={2}
            boxSizing="border-box"
            textAlign="center"
            zIndex={10}
          >
            {result.length === 0 ? (
              <>
                <br />
                Không tìm thấy sản phẩm!
              </>
            ) : (
              result.map((item) => (
                <Box
                  key={item.productId}
                  component={Link}
                  href={`${ROUTES.product}/${item.name.replaceAll(" ", "-")}/${item.productId}`}
                  onClick={() => setShowResult(false)}
                  py={1}
                  display="flex"
                  alignItems="center"
                  gap={2}
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
                    priority
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
  );
}

export default Search;
