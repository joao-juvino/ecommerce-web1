import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // Certifique-se que o caminho está correto
import AppLayout from "./components/AppLayout"; // Importe o novo layout

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Ecommerce",
  description: "Criado com Next.js e FastAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}