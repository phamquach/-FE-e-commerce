import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/contexts/authContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sky Computer",
  description: `Trải nghiệm máy tính chất lượng, cấu hình cao, nhân viên tư vấn nhiệt tình, láp ráp tận nơi, đến ngay với Sky-Computer nơi cung cấp dịch vụ máy tính tốt nhất. Tất cả vì sự hài lòng của khách hàng`,
  icons: "icon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
