"use clietnt";
import { Box, MenuItem } from "@mui/material";
import Link from "next/link";

interface Menus {
  path: string;
  title: string;
}

interface IHeaderTablet {
  MENUS: Array<Menus>;
}
function HeaderTablet({ MENUS }: IHeaderTablet) {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      {MENUS.map((menu) => (
        <Link key={menu.title} href={menu.path}>
          <MenuItem
            sx={{
              "::before": {
                content: '""',
                width: "100%",
                height: 3,
                bgcolor: "var(--background-default)",
                position: "absolute",
                bottom: 0,
                left: 0,
                scale: 0,
                transition: "scale 0.5s ease-in-out",
              },
              ":hover": {
                ":before": {
                  scale: 1,
                },
                background: "none",
              },
              color: "var(--background-default)",
            }}
          >
            {menu.title}
          </MenuItem>
        </Link>
      ))}
    </Box>
  );
}

export default HeaderTablet;
