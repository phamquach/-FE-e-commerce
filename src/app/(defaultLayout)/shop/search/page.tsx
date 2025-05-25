"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import ListProduct from "@/components/ListProduct";
import { Box, Grid, Typography } from "@mui/material";

import getProductsBySearchQuery from "@/services/api/findProductBySearchQuery";

export default function SearchPage() {
  const [data, setData] = React.useState<Products[]>([]);
  const searchQuery = useSearchParams();
  const query = React.useMemo(() => {
    return searchQuery.get("q");
  }, [searchQuery]);

  React.useEffect(() => {
    (async () => {
      try {
        setData((await getProductsBySearchQuery(query))?.data ?? []);
      } catch {
        setData([]);
      }
    })();
  }, [query]);

  return (
    <Box>
      <Typography variant="h5" className="title">
        Kết quả tìm kiếm &quot;{query}&quot;
      </Typography>
      {data.length === 0 && (
        <Typography textAlign={"center"} variant="h6">
          <br />
          Không tìm thấy sản phầm nào!
        </Typography>
      )}
      {data.length !== 0 && (
        <Grid
          display={"grid"}
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
            xl: "repeat(7, 1fr)",
          }}
          gap={3}
          p={2}
          borderRadius={2}
        >
          <ListProduct listProducts={data} />
        </Grid>
      )}
    </Box>
  );
}
