import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import { mooli } from "./fonts";
import "../styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://its-probably-spicy-outstatic.vercel.app"),
  title: {
    default: "It's Probably Spicy",
    template: "%s | It's Probably Spicy",
  },
  description: "A Recipe Blog",
  openGraph: {
    title: "It's Probably Spicy",
    description: "A recipe blog.",
    url: absoluteUrl("/"),
    siteName: "It's Probably Spicy",
    images: [],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon/favicon-32x32.png" }],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mooli.className}>
      <body>{children}</body>
    </html>
  );
}
