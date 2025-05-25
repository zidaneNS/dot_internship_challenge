import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/userContext";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Quiz Master",
  description: "Mastering your knowledge with our quiz app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <UserProvider>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-blue-950 to-black text-slate-300">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
