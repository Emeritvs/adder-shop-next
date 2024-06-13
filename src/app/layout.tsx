/* eslint-disable @next/next/no-page-custom-font */
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
import Nav from '@/components/nav';
import { container } from 'webpack';
import { MainContextProvider } from '@/contexts/MainContext';
import ToastAlert from '@/components/toast-alert/toast-alert';
import CartSidebarMenu from '@/components/cart-sidebar-menu/cart-sidebar-menu';
import { ProductContextProvider } from '@/contexts/ProductContext';
import { AccountContextProvider } from '@/contexts/AccountContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Protest+Riot&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MainContextProvider>
          <Nav />

          <AccountContextProvider>
            <ProductContextProvider>
              <CartSidebarMenu />
              <div className="container mx-auto">{children}</div>
            </ProductContextProvider>
          </AccountContextProvider>

          <ToastAlert />
        </MainContextProvider>
      </body>
    </html>
  );
}
