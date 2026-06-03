import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./asset/library.scss";
import { Providers } from "@/app/providers/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { Cursor } from "@/components/ui/cursor";
import { LenisProvider } from "./providers/lenis-providers";
import { PageTransition } from "@/components/ui/page-transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-monorepo-ten.vercel.app"),
  title: {
    default: "Tuan Tran — Full Stack Developer",
    template: "%s | Tuan Tran",
  },
  description:
    "Full stack developer based in Ho Chi Minh City. Building scalable web applications with NestJS, Next.js, and modern technologies.",
  keywords: [
    "Full Stack Developer",
    "NestJS",
    "Next.js",
    "TypeScript",
    "Vietnam",
  ],
  authors: [{ name: "Tuan Tran" }],
  creator: "Tuan Tran",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-monorepo-ten.vercel.app",
    siteName: "Tuan Tran Portfolio",
    title: "Tuan Tran — Full Stack Developer",
    description: "Full stack developer based in Ho Chi Minh City.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tuan Tran Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuan Tran — Full Stack Developer",
    description: "Full stack developer based in Ho Chi Minh City.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Cursor />
        <Providers>
          <LenisProvider>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <Navbar />
              <main className="flex-1 pt-16">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
            <Toaster />
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
