"use clietnt";
import { Box, MenuItem } from "@mui/material";
import Link from "next/link";
import { JSX } from "react";

interface Menus {
  path: string;
  title: string;
}

interface IHeaderTablet {
  MENUS: Array<Menus>;
  IconMenu?: Array<JSX.Element>;
}
function HeaderTablet({ MENUS, IconMenu }: IHeaderTablet) {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      {MENUS.map((menu, index) => (
        <Link key={menu.title} href={menu.path}>
          <MenuItem
            sx={{
              display: 'inline-flex',
              gap: 1,
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
                  scale: 0.8,
                },
                background: "none",
              },
              color: "var(--background-default)",
            }}
          >
            {IconMenu && IconMenu[index]}
            {menu.title}
          </MenuItem>
        </Link>
      ))}
    </Box>
  );
}

export default HeaderTablet;
