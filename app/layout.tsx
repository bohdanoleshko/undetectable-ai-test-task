import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Text Summarizer",
  description: "UndetectableAI test task",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased lg:px-6 py-3 flex flex-col items-center`}
      >
        <header className="w-full pb-6 border-b shadow-sm my-3">
          <div className="flex justify-center items-center w-full">
            <h1 className="font-bold text-4xl text-cyan-500 justify-self-center">
              Text Summarizer
            </h1>
          </div>
        </header>
        <main className="flex items-center justify-center w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
