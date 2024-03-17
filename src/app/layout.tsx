import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import { mooli } from "./fonts";
import "../styles/index.css";

export const metadata: Metadata = {
  title: {
    template: "%s | It's Probably Spicy",
    default: "It's Probably Spicy",
  },
  description:
    "Head Chef Daisy presents her amazing recipes from all around the world. Just remember, It's Probably Spicy!",
  generator: "Next.js",
  applicationName: "It's Probably Spicy",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Its Probably Spicy",
    "Its",
    "Probably",
    "Spicy",
    "Recipe",
    "Recipes",
    "Blog",
    "Recipe Blog",
    "Recipes Blog",
    "Nigerian",
    "Nigerian Food",
    "Nigerian Recipes",
    "Nigerian Food Recipes",
  ],
  authors: [{ name: "Daisy" }],
  creator: "Toby",
  publisher: "It's Probably Spicy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "It's Probably Spicy",
    description:
      "Head Chef Daisy presents her amazing recipes from all around the world. Just remember, It's Probably Spicy!",
    url: absoluteUrl("/"),
    siteName: "It's Probably Spicy",
    locale: "en_US",
    type: "website",
    /*
    publishedTime: '2023-01-01T00:00:00.000Z',
    authors: ['Seb', 'Josh'],
    */
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
