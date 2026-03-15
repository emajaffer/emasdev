import type { Metadata } from "next";
import { getSharedSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = getSharedSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
