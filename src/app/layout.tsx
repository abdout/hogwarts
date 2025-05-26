import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
// import { auth } from "../../auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hogwarts - School Management System",
  description: "A comprehensive school management system built with Next.js and AuthJS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SessionProvider session={session}> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="layout-container">
              {children}
            </div>
          </ThemeProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
