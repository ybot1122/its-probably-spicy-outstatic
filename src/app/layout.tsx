import { absoluteUrl } from "@/lib/absoluteUrl";
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
  authors: [{ name: "Head Chef Daisy" }],
  creator: "Head Chef Daisy",
  publisher: "It's Probably Spicy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: {
      template: "%s | It's Probably Spicy",
      default: "It's Probably Spicy",
    },
    description:
      "Head Chef Daisy presents her amazing recipes from all around the world. Just remember, It's Probably Spicy!",
    url: absoluteUrl("/"),
    siteName: "It's Probably Spicy",
    locale: "en_US",
    type: "website",
    /*
    publishedTime: '2023-01-01T00:00:00.000Z',
    authors: ['Head Chef Daisy'],
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
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
};

// TODO: Google site verification
// TODO: twitter https://nextjs.org/docs/app/api-reference/functions/generate-metadata#twitter
// TODO: appleWebApp https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applewebapp
// TODO: alternates https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates
// TODO: appLinks https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applinks

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
