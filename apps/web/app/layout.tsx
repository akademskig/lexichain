import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "LexiChain - Fluency with Proof",
  description:
    "Learn languages with blockchain-verified credentials. Spaced repetition flashcards with on-chain achievements.",
  keywords: [
    "language learning",
    "flashcards",
    "blockchain",
    "web3",
    "education",
    "spaced repetition",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicons/favicon-32x32-lexi-logo-icon.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/favicons/favicon-16x16-lexi-logo-icon.png"
          sizes="16x16"
        />
        <link
          rel="apple-touch-icon"
          href="/favicons/apple-touch-icon-180x180-lexi-logo-icon.png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
