/* LANDING PAGE COMPONENT */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/landing/CookieConsent";
import Script from "next/script";

const inter = Inter({
// ... rest of inter config ...
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tekverai.com"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: "TekverAI - AI Code & System Verification Platform",
  description:
    "TekverAI is an AI-powered code and system verification platform that automatically detects vulnerabilities, logic errors, and performance risks in your codebase before deployment.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI code verification",
    "system security",
    "code analysis",
    "vulnerability detection",
    "DevSecOps",
    "automated code review",
  ],
  openGraph: {
    title: "TekverAI — AI Code & System Verification Platform",
    description:
      "GPU-accelerated AI that reviews, verifies, and secures your software before deployment.",
    url: "https://tekverai.com",
    siteName: "TekverAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TekverAI — AI Code & System Verification",
    description: "Intelligent code verification powered by AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>

        <meta name="theme-color" content="#0B0F19" />
      </head>
      <body className={inter.className}>
        {children}
        <CookieConsent />
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69b93bb45005201c341f2d84/1jjtp2et5';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
