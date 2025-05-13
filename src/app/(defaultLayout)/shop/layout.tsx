import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sky Shop",
};

export default function LayoutShop({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
