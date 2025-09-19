import { ShoppingCart, Store } from "lucide-react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#ebebeb]">
        <header className="w-full bg-[#ba4949]">
          <nav className="flex py-2 px-100 justify-center items-center gap-10">
            <div className="h-20 w-20 flex justify-center items-center text-white">
              <Store className="h-15 w-15" strokeWidth={2} />
            </div>
            <input className="grow-1 bg-white px-7 py-3" type="search" placeholder="pesquisar" />
            <ul className="flex gap-10">
              <li className="flex items-center text-white"><ShoppingCart className="w-10 h-10" /></li>
              <li className="bg-white text-gray-800  py-3 px-6">Login</li>
            </ul>
          </nav>
        </header>
        <main className="w-full min-h-dvh">
          {children}
        </main>
        <footer className="w-full h-30 bg-[#ba4949] flex justify-center items-center text-white">
          <p>@ecommerce</p>
        </footer>
      </body>
    </html>
  );
}
