import Link from "next/link";
import ROUTES from "@/routes/routes";
import { convertSlugToText } from "@/lib";
import {
  Breadcrumbs as BreadcrumbsMUI,
  Link as LinkMUI,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Breadcrumbs({ listMenu }: { listMenu?: Array<keyof typeof ROUTES> }) {
  return (
    <BreadcrumbsMUI
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {listMenu?.map((menu, index) => {
        if (index === listMenu.length - 1) {
          return (
            <Typography key={index} sx={{ color: "text.primary" }}>
              {convertSlugToText(menu)}
            </Typography>
          );
        }

        return (
          <LinkMUI
            key={index}
            component={Link}
            underline="hover"
            color="inherit"
            href={ROUTES[menu] || "#"}
            display={"inline-flex"}
            alignItems={"start"}
            gap={1}
          >
            {menu.charAt(0).toUpperCase() + menu.slice(1)}
          </LinkMUI>
        );
      })}
    </BreadcrumbsMUI>
  );
}

export default Breadcrumbs;
