import localFont from "next/font/local";

export const oswald = localFont({
  src: "../public/fonts/Oswald.ttf",
  variable: "--font-oswald",
  display: "swap",
  weight: "200 700",
});

export const inter = localFont({
  src: "../public/fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
