import { Josefin_Sans, Lato } from "next/font/google";

export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: '--font-josefin-sans'
})

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: '--font-lato'
})
