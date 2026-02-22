import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { SerwistProvider } from "./serwist";
import { TRPCReactProvider } from "~/trpc/react";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "GreenCircle — Community Waste & Sustainability",
  description: "Understand, monitor, and improve waste management in your local community.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GreenCircle",
  },
};

export const viewport: Viewport = {
  themeColor: "#047857",
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <SerwistProvider swUrl="/serwist/sw.js">
          <SessionProvider session={session}>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </SessionProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
