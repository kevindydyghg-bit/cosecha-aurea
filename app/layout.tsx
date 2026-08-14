import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"] });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.webp`;
  return {
    title: "Cosecha Áurea | Vainilla Premium Mexicana",
    description: "Vainas de vainilla premium mexicana de Papantla, Veracruz. Selección gourmet para cocina, repostería y profesionales.",
    icons: { icon: "/assets/logo-optimized.png" },
    openGraph: { title: "Cosecha Áurea", description: "Vainilla premium mexicana de Papantla, Veracruz.", images: [{ url: image, width: 1200, height: 630, alt: "Cosecha Áurea — Vainilla premium mexicana" }] },
    twitter: { card: "summary_large_image", title: "Cosecha Áurea", description: "Vainilla premium mexicana de Papantla, Veracruz.", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${sans.variable} ${serif.variable}`}>{children}</body></html>;
}
