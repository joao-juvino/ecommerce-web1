"use client";
import { usePathname } from "next/navigation";
import Menu from "@/app/components/Menu";
import { CartProvider } from "@/app/context/CartContext";
import { NotificationProvider } from "@/app/context/NotificationContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/auth");

  return (
    <html lang="pt-BR">
      <body className="bg-[#ebebeb] min-h-screen flex flex-col">
        <NotificationProvider>
          <CartProvider>
            {!isAuthRoute && <Menu />}
            <main className={`w-full flex-1 ${!isAuthRoute ? "min-h-dvh" : "flex justify-center items-center"}`}>
              {children}
            </main>
            {!isAuthRoute && (
              <footer className="w-full h-30 bg-[#ba4949] flex justify-center items-center text-white">
                <p>@ecommerce</p>
              </footer>
            )}
          </CartProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
