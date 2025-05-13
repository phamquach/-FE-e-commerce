import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh mục",
};

export default function LayoutCatgory({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
