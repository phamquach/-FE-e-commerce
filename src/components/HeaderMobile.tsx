"use client";
import Link from "next/link";
import ROUTES from "@/routes/routes";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface IHeaderMobile {
  drawerOpen: boolean;
  setDrawerOpen: (val: boolean) => void;
  MENUS: Array<Menus>;
}
function HeaderMobile({ drawerOpen, setDrawerOpen, MENUS }: IHeaderMobile) {
  return (
    <>
      <IconButton edge="start" onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <ListItem
          component={Link}
          href={ROUTES.home}
          onClick={() => setDrawerOpen(false)}
        >
          <h2
            style={{
              color: "var(--background-default)",
              fontFamily: "var(--font-header-default) !important",
            }}
          >
            Sky-Computer
          </h2>
        </ListItem>
        <Box width={250}>
          <List>
            {MENUS.map((menu) => (
              <ListItem
                key={menu.title}
                href={menu.path}
                component={Link}
                onClick={() => setDrawerOpen(false)}
                sx={{ display: "inline-flex", gap: 1, alignItems: "center" }}
              >
                {menu.icon}
                <ListItemText>{menu.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default HeaderMobile;
