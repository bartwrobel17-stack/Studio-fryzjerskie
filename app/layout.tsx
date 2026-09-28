import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Fryzjerskie | Wrocław",
  description: "Studio Fryzjerskie we Wrocławiu, Powstańców Śląskich 56a/1. Strzyżenie, koloryzacja i stylizacja.",
  keywords: ["fryzjer Wrocław", "Studio Fryzjerskie", "Powstańców Śląskich", "fryzjer"],
  openGraph: {
    title: "Studio Fryzjerskie | Wrocław",
    description: "Salon fryzjerski przy ul. Powstańców Śląskich 56a/1 we Wrocławiu.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}