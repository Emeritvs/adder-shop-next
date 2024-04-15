"use client";
import { Metadata } from 'next';
import "./globals.css";

 const navLinks = [
   { name: "Blog", href: "/blog" },
   { name: "Products", href: "/products" },
 ];

import backgroundImage from "../../public/wall.jpg";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HeaderAlert from '@/components/header-alert';
import ToastAlert from '@/components/toast-alert';
import Nav from '@/components/nav';
import { container } from 'webpack';
import { MainContextProvider } from '@/contexts/MainContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const pathname = usePathname();
    const [input, setInput] = useState("");
    const [colorMode, setColorMode] = useState("dark");
    const [pageTitle, setPageTitle] = useState("Home");
    const containerStyle = {
        // border: "4px solid",
        // borderRadius: "5px",
        color: "#f78002",
        // margin: "0 10% 0 10%",
        backgroundColor: " rgb(24 24 27 / 0.8)",
        // height: "100vh",
    };

  return (
    <html lang="en">
      <head></head>
      <body>
        <MainContextProvider>
            <Nav></Nav>
            <div>{children}</div>

            {/* <footer style={{ backgroundColor: "ghostwhite", padding: "1rem" }}>
            <p>Footer</p>
          </footer> */}
        </MainContextProvider>
      </body>
    </html>
  );
}
