import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm",
};

export default function LayoutProducts({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
