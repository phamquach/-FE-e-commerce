import Banner from "@/components/banner";
import Footer from "@/layouts/home/footer";
import Header from "@/layouts/home/header";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header */}
      <Banner />
      <Header />
      <Box p={{ md: 2, xs: '16px 5px'}} px={{md: 5}}>{children}</Box>
      {/* Footer */}
      <Footer />
    </>
  );
}
