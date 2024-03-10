import {
  Fraunces,
  Libre_Baskerville,
  Dosis,
  Kalam,
  Mooli,
} from "next/font/google";

// 300-light, 400-semibold, 700-bold
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
});

export const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const mooli = Libre_Baskerville({
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
