import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function LayoutRegister({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
