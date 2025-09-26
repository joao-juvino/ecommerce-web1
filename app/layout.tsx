import "./globals.css";
import Menu from "@/app/components/Menu";
import { CartProvider } from "@/app/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#ebebeb]">
        <CartProvider>
          <Menu />
          <main className="w-full min-h-dvh">
            {children}
          </main>
          <footer className="w-full h-30 bg-[#ba4949] flex justify-center items-center text-white">
            <p>@ecommerce</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
