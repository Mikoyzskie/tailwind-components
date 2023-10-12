import "./globals.css";
import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";




export const metadata: Metadata = {
  title: "Zanda | High Quality Architectural Door Hardware & More",
  description: "Zanda Architectural Hardware is a designer, manufacturer & supplier of high-quality door hardware with distributors located Australia-wide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
