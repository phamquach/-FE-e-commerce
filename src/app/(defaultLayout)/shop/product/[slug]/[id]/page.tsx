'use client'
import ROUTES from "@/routes/routes";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

function ViewDetailsProduct() {
  const path = usePathname();

  return (
    <Breadcrumbs
      listMenu={[
        "home",
        ...(path
          .split("/")
          .splice(1, path.split("/").length - 2)
          .filter((item) => item !== 'product') as (keyof typeof ROUTES)[]),
      ]}
    />
  );
}

export default ViewDetailsProduct;
