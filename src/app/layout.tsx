import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Sla Store",
    default: "Sla Store",
  },
  description:
    "Site de vendas feito com Next.js por um estudante de programação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <SessionProvider>
            <Suspense>{children}</Suspense>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
