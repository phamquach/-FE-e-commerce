import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
