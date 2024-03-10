import { Dosis, Kalam, Mooli } from "next/font/google";

// 300-light, 400-semibold, 700-bold

export const mooli = Mooli({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const dosis = Dosis({
  subsets: ["latin"],
  display: "swap",
});

export const kalam = Kalam({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
});
