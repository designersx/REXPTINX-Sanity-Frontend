"use client";
import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ZoomPrevention } from "@/components/zoom-prevention";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import { Lato } from "next/font/google";
import Script from "next/script";
// Load Lato font with the correct variable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

// Load Lato font with specific weights (400 and 700 in this case)
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap"
});
// Initialize Sanity Client
const client = sanityClient({
  projectId: "erxyk65j",
  dataset: "production",
  apiVersion: "2025-05-26",
  useCdn: false,
  
});

// Fetch site metadata from Sanity
const fetchSiteMetadata = async () => {
  try {
    const data = await client.fetch(`
      *[_type == "metadata"][0] {
        title,
        description,
        favicon { asset -> { url } },
        appleIcon { asset -> { url } },
        generator
      }
    `);

    // Check if data exists and return early
    if (!data) {
      console.log("No data found for site metadata.");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching site metadata:", error);
    return null;
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  useEffect(() => {
    const loadMetadata = async () => {
      const data = await fetchSiteMetadata();
      if (data) {
        const dynamicMetadata: Metadata = {
          title: data.title || "rexpt - The AI Receptionist Service",
          description:
            data.description ||
            "Transform your business communications with AI-powered receptionists that sound and respond like humans.",
          icons: {
            icon: data.appleIcon?.asset?.url || "/favicon.ico",
          },
          generator: data.generator || "v0.dev",
        };
        setMetadata(dynamicMetadata);
      }
    };
    loadMetadata();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
     
        {metadata ? (
          <>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <link rel="icon" href={metadata.icons.icon} sizes="any" />
            <meta name="description" content={metadata.description} />
            <meta name="generator" content={metadata.generator} />
            <title>{metadata.title}</title>
          </>
        ) : (
          <>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/apple-icon.png" />
            <meta
              name="description"
              content="Transform your business communications with AI-powered receptionists."
            />
            <meta name="generator" content="v0.dev" />
            <title>rexpt - The AI Receptionist Service</title>
  {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GJHHPPH2V6"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GJHHPPH2V6');
          `}
        </Script>
            <script type="module" src="https://cheery-concha-c34d2b.netlify.app"></script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${lato.variable} font-inter`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ZoomPrevention />
          {children}
        </ThemeProvider>
        {/* <div id="review-widget">

        </div> */}
      </body>
    </html>
  );
}