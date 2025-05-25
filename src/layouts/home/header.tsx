"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Badge,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ROUTES from "@/routes/routes";
import { useAuth } from "@/contexts/authContext";
import { useDebounce } from "@/hooks/useDebounce";
import getProductsBySearchQuery from "@/services/api/findProductBySearchQuery";

import HeaderMobile from "@/components/HeaderMobile";
import HeaderTablet from "@/components/HeaderTablet";
import Search from "@/components/Search";
import SearchMobile from "@/components/SearchMobile";
import AccountMenu from "@/components/AccountMenu";

const MENUS = [
  { title: "Home", path: ROUTES.home, icon: <HomeIcon /> },
  { title: "Shop", path: ROUTES.shop, icon: <ShoppingBasketIcon /> },
  { title: "About", path: "#about", icon: <GroupsIcon /> },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState<{
    value: string;
    data: Products[];
    showResultSearch: boolean;
  }>({ value: "", data: [], showResultSearch: false });

  const debouncedValue = useDebounce(search.value, 500);

  useEffect(() => {
    if (debouncedValue === "") {
      return setSearch((prev) => ({ ...prev, data: [] }));
    }

    (async () => {
      try {
        const { data } = await getProductsBySearchQuery(debouncedValue.trim());
        setSearch((prev) => ({ ...prev, data }));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [debouncedValue]);

  const handleSearchValue = (value: string) => {
    if (value.startsWith(" ")) return;
    setSearch((prev) => ({ ...prev, value }));
  };

  const handleShowSearchResult = (show: boolean) => {
    setSearch((prev) => ({ ...prev, showResultSearch: show }));
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: "white", top: 0 }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", gap: 2, flexWrap: "nowrap" }}
      >
        {/* Left Navigation */}
        {isMobile ? (
          <HeaderMobile
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            MENUS={MENUS}
          />
        ) : (
          <HeaderTablet MENUS={MENUS} />
        )}

        {/* Search + Auth + Cart */}
        <Box
          display="flex"
          flex={1}
          justifyContent="end"
          alignItems="center"
          gap={1}
        >
          {isMobile ? (
            <SearchMobile
              showResult={search.showResultSearch}
              setShowResult={handleShowSearchResult}
              value={search.value}
              setValue={handleSearchValue}
              result={search.data}
            />
          ) : (
            <Search
              showResult={search.showResultSearch}
              setShowResult={handleShowSearchResult}
              value={search.value}
              setValue={handleSearchValue}
              result={search.data}
            />
          )}

          {user ? (
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
