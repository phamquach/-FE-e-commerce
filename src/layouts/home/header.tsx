"use client";
import Link from "next/link";
import { useState } from "react";
import ROUTES from "@/routes/routes";
import AccountMenu from "@/components/Profile";
import HeaderMobile from "@/components/HeaderMobile";
import HeaderTablet from "@/components/HeaderTablet";
import {
  AppBar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
const MENUS = [
  { title: "Home", path: ROUTES.home, icon: <HomeIcon /> },
  { title: "Shop", path: ROUTES.shop, icon: <ShoppingBasketIcon /> },
  { title: "About", path: "#about", icon: <GroupsIcon /> },
  { title: "Contact", path: "#aasd", icon: <RecentActorsIcon /> },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: "white", top: 0 }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}
      >
        {isMobile ? (
          <HeaderMobile
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            MENUS={MENUS}
          />
        ) : (
          <HeaderTablet MENUS={MENUS} />
        )}

        <Box
          display={"flex"}
          sx={{ flex: 1, justifyContent: "end", alignItems: "center" }}
          gap={1}
        >
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm sản phẩm..."
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchValue && (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setSearchValue("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, maxWidth: 500 }}
          />
          {true ? (
            <>
              <Link href={ROUTES.cart}>
                <IconButton color="inherit">
                  <Badge badgeContent={1999} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              <AccountMenu />
            </>
          ) : (
            <ButtonGroup>
              <Link href={ROUTES.login}>
                <Button>Login</Button>
              </Link>
              <Link href={ROUTES.register}>
                <Button>Register</Button>
              </Link>
            </ButtonGroup>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
